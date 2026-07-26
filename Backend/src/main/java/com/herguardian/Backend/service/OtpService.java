package com.herguardian.Backend.service;

import com.herguardian.Backend.entity.OTP;
import com.herguardian.Backend.repository.OTPRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OTPRepository otpRepository;
    private final EmailService emailService;

    private final SecureRandom secureRandom = new SecureRandom();

    @Transactional
    public void generateAndSendOtp(String rawEmail) {

        String email = normalizeEmail(rawEmail);

        String otpCode = String.format(
                Locale.ROOT,
                "%06d",
                secureRandom.nextInt(1_000_000)
        );

        /*
         * Remove any old OTP first.
         * This prevents "OTP Already Sent" from blocking future login attempts.
         */
        otpRepository.deleteByEmail(email);

        OTP otp = OTP.builder()
                .email(email)
                .otp(otpCode)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .build();

        otpRepository.saveAndFlush(otp);

        /*
         * This is the actual email-sending call.
         */
        emailService.sendOtp(email, otpCode);
    }

    @Transactional
    public void verifyOtp(String rawEmail, String rawOtp) {

        String email = normalizeEmail(rawEmail);

        if (rawOtp == null || rawOtp.trim().isEmpty()) {
            throw new IllegalArgumentException("OTP is required");
        }

        String enteredOtp = rawOtp.trim();

        OTP savedOtp = otpRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "OTP not found. Please request a new OTP."
                        )
                );

        if (savedOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpRepository.deleteByEmail(email);

            throw new IllegalArgumentException(
                    "OTP expired. Please request a new OTP."
            );
        }

        if (!savedOtp.getOtp().equals(enteredOtp)) {
            throw new IllegalArgumentException("Invalid OTP");
        }

        /*
         * OTP can be used only once.
         */
        otpRepository.deleteByEmail(email);
    }

    private String normalizeEmail(String email) {

        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        return email.trim().toLowerCase(Locale.ROOT);
    }
}