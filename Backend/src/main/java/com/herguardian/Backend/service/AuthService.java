package com.herguardian.Backend.service;

import com.herguardian.Backend.dto.RegisterRequest;
import com.herguardian.Backend.repository.UserRepository;
import com.herguardian.Backend.util.OtpGenerator;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.herguardian.Backend.entity.PendingUser;
import com.herguardian.Backend.repository.PendingUserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;

@Service
@Builder
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PendingUserRepository pendingUserRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        pendingUserRepository.findByEmail(request.getEmail())
                .ifPresent(pendingUserRepository::delete);

        String otp = OtpGenerator.generateOtp();

        PendingUser pendingUser = PendingUser.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .emergencyContact(request.getEmergencyContact())
                .voicePhrase(request.getVoicePhrase())
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .build();

        pendingUserRepository.save(pendingUser);

        emailService.sendOtp(request.getEmail(), otp);

        return "OTP Sent Successfully";
    }
}