package com.herguardian.Backend.service;

import com.herguardian.Backend.dto.ChangePasswordRequest;
import com.herguardian.Backend.dto.ChangeVoicePhraseRequest;
import com.herguardian.Backend.dto.UpdateProfileRequest;
import com.herguardian.Backend.dto.UserResponse;
import com.herguardian.Backend.entity.User;
import com.herguardian.Backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class UserService {

    private final UserRepository repository;
    private final OtpService otpService;
    private final PasswordEncoder passwordEncoder;

    private static final Pattern PHONE_PATTERN =
            Pattern.compile("^[6-9]\\d{9}$");

    private static final Pattern PASSWORD_PATTERN =
            Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$");

    public UserService(UserRepository repository,
                       OtpService otpService,
                       PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.otpService = otpService;
        this.passwordEncoder = passwordEncoder;
    }

    // ---------------- GET LOGGED IN USER ----------------

    public UserResponse getLoggedInUser(Authentication authentication) {

        String email = authentication.getName();

        User user = repository.findByEmail(email).orElseThrow();

        return UserResponse.builder()
                .fullName(user.getFullName())
                .email(user.getEmail())
                .emergencyContact1(user.getEmergencyContact1())
                .emergencyContact2(user.getEmergencyContact2())
                .emergencyContact3(user.getEmergencyContact3())
                .voicePhrase(user.getVoicePhrase())
                .build();
    }

    // ---------------- REQUEST OTP FOR ACCOUNT ACTION ----------------

    public void requestOtp(Authentication authentication) {

        String email = authentication.getName();

        // ensure user exists
        repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        otpService.generateAndSendOtp(email);
    }

    // ---------------- UPDATE PROFILE ----------------

    public String updateProfile(Authentication authentication,
                                UpdateProfileRequest request) {

        String email = authentication.getName();

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 1. Verify OTP
        otpService.verifyOtp(email, request.getOtp());

        // 2. Validate inputs
        if (request.getFullName() == null || request.getFullName().trim().isEmpty()) {
            throw new RuntimeException("Full name cannot be empty");
        }

        validatePhone(request.getEmergencyContact1(), "Emergency Contact 1");
        validatePhone(request.getEmergencyContact2(), "Emergency Contact 2");
        validatePhone(request.getEmergencyContact3(), "Emergency Contact 3");

        if (request.getEmergencyContact1().equals(request.getEmergencyContact2())
                || request.getEmergencyContact1().equals(request.getEmergencyContact3())
                || request.getEmergencyContact2().equals(request.getEmergencyContact3())) {
            throw new RuntimeException("All emergency contacts must be different");
        }

        // 3. Update
        user.setFullName(request.getFullName().trim());
        user.setEmergencyContact1(request.getEmergencyContact1().trim());
        user.setEmergencyContact2(request.getEmergencyContact2().trim());
        user.setEmergencyContact3(request.getEmergencyContact3().trim());

        repository.save(user);

        return "Profile updated successfully";
    }

    // ---------------- CHANGE PASSWORD ----------------

    public String changePassword(Authentication authentication,
                                 ChangePasswordRequest request) {

        String email = authentication.getName();

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 1. Verify OTP
        otpService.verifyOtp(email, request.getOtp());

        // 2. Verify current password
        if (request.getCurrentPassword() == null
                || !passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // 3. Validate new password
        if (request.getNewPassword() == null
                || !PASSWORD_PATTERN.matcher(request.getNewPassword()).matches()) {
            throw new RuntimeException(
                    "Password must be at least 8 characters and contain uppercase, lowercase, number and special character"
            );
        }

        if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new RuntimeException("New password cannot be same as current password");
        }

        // 4. Update
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        repository.save(user);

        return "Password changed successfully";
    }

    // ---------------- CHANGE VOICE PHRASE ----------------

    public String changeVoicePhrase(Authentication authentication,
                                    ChangeVoicePhraseRequest request) {

        String email = authentication.getName();

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 1. Verify OTP
        otpService.verifyOtp(email, request.getOtp());

        // 2. Verify password (extra security for such sensitive field)
        if (request.getCurrentPassword() == null
                || !passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Password is incorrect");
        }

        // 3. Validate new phrase
        if (request.getNewVoicePhrase() == null
                || request.getNewVoicePhrase().trim().length() < 4) {
            throw new RuntimeException("Voice phrase must contain at least 4 characters");
        }

        // 4. Update
        user.setVoicePhrase(request.getNewVoicePhrase().trim());
        repository.save(user);

        return "Voice phrase changed successfully";
    }

    // ---------------- HELPERS ----------------

    private void validatePhone(String phone, String label) {
        if (phone == null || !PHONE_PATTERN.matcher(phone.trim()).matches()) {
            throw new RuntimeException(label + " must be a valid 10-digit mobile number");
        }
    }
}