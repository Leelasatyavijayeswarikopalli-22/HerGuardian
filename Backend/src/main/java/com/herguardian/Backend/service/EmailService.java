package com.herguardian.Backend.service;

import com.herguardian.Backend.exception.OtpDeliveryException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public void sendOtp(String email, String otp) {

        String normalizedEmail = email.trim().toLowerCase();

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(senderEmail);
        message.setTo(normalizedEmail);
        message.setSubject("HerGuardian OTP Verification");

        message.setText(
                "Hello,\n\n" +
                        "Your HerGuardian OTP is: " + otp + "\n\n" +
                        "This OTP is valid for 5 minutes.\n\n" +
                        "If you did not request this OTP, please ignore this email.\n\n" +
                        "Stay Safe!\n" +
                        "HerGuardian Team"
        );

        try {
            mailSender.send(message);
            log.info("OTP sent successfully to {}", normalizedEmail);
        } catch (MailException exception) {
            log.error("Could not send OTP to {}", normalizedEmail, exception);

            throw new OtpDeliveryException(
                    "Unable to send OTP email",
                    exception
            );
        }
    }
}