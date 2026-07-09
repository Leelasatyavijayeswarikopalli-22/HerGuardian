package com.herguardian.Backend.service;

import com.herguardian.Backend.dto.LoginRequest;
import com.herguardian.Backend.dto.LoginResponse;
import com.herguardian.Backend.dto.RegisterRequest;
import com.herguardian.Backend.dto.VerifyOtpRequest;
import com.herguardian.Backend.entity.PendingUser;
import com.herguardian.Backend.entity.User;
import com.herguardian.Backend.repository.PendingUserRepository;
import com.herguardian.Backend.repository.UserRepository;
import com.herguardian.Backend.util.OtpGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PendingUserRepository pendingUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Autowired
    public AuthService(UserRepository userRepository,
                       EmailService emailService,
                       PendingUserRepository pendingUserRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {

        this.userRepository = userRepository;
        this.emailService = emailService;
        this.pendingUserRepository = pendingUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // ---------------- REGISTER ----------------

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        PendingUser existingUser = pendingUserRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (existingUser != null) {

            // OTP still valid
            if (existingUser.getExpiryTime().isAfter(LocalDateTime.now())) {

                emailService.sendOtp(
                        existingUser.getEmail(),
                        existingUser.getOtp()
                );

                return "OTP Already Sent";
            }

            // OTP expired
            pendingUserRepository.delete(existingUser);
        }

        String otp = OtpGenerator.generateOtp();

        PendingUser pendingUser = PendingUser.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .emergencyContact1(request.getEmergencyContact1())
                .emergencyContact2(request.getEmergencyContact2())
                .emergencyContact3(request.getEmergencyContact3())
                .voicePhrase(request.getVoicePhrase())
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .build();

        pendingUserRepository.save(pendingUser);

        emailService.sendOtp(request.getEmail(), otp);

        return "OTP Sent Successfully";
    }
    // ---------------- VERIFY OTP ----------------

    public String verifyOtp(VerifyOtpRequest request) {

        PendingUser pendingUser = pendingUserRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (pendingUser == null) {
            return "User not found";
        }

        if (!pendingUser.getOtp().equals(request.getOtp())) {
            return "Invalid OTP";
        }

        if (pendingUser.getExpiryTime().isBefore(LocalDateTime.now())) {
            return "OTP Expired";
        }

        User user = User.builder()
                .fullName(pendingUser.getFullName())
                .email(pendingUser.getEmail())
                .password(pendingUser.getPassword())
                .emergencyContact1(pendingUser.getEmergencyContact1())
                .emergencyContact2(pendingUser.getEmergencyContact2())
                .emergencyContact3(pendingUser.getEmergencyContact3())
                .voicePhrase(pendingUser.getVoicePhrase())
                .verified(true)
                .build();

        userRepository.save(user);

        pendingUserRepository.delete(pendingUser);

        return "Registration Successful";
    }

    // ---------------- LOGIN ----------------

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                "Login Successful",
                user.getFullName(),
                user.getEmail(),
                user.getEmergencyContact1(),
                user.getEmergencyContact2(),
                user.getEmergencyContact3()
        );
    }
    public String getVoicePhrase(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return user.getVoicePhrase();
    }

}