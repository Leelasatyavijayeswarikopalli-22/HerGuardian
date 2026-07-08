package com.herguardian.Backend.service;

import com.herguardian.Backend.dto.RegisterRequest;
import com.herguardian.Backend.entity.OTP;
import com.herguardian.Backend.repository.OTPRepository;
import com.herguardian.Backend.repository.UserRepository;
import com.herguardian.Backend.util.OtpGenerator;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Builder
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private EmailService emailService;

    public String register(RegisterRequest request){

        if(userRepository.existsByEmail(request.getEmail())){
            return "Email already registered";
        }

        String otp = OtpGenerator.generateOtp();

        otpRepository.findByEmail(request.getEmail())
                .ifPresent(otpRepository::delete);

        OTP otpEntity = OTP.builder()
                .email(request.getEmail())
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .build();

        otpRepository.save(otpEntity);

        emailService.sendOtp(request.getEmail(), otp);

        return "OTP Sent Successfully";
    }

}