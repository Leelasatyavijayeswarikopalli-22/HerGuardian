package com.herguardian.Backend.controller;

import com.herguardian.Backend.dto.ChangePasswordRequest;
import com.herguardian.Backend.dto.ChangeVoicePhraseRequest;
import com.herguardian.Backend.dto.UpdateProfileRequest;
import com.herguardian.Backend.dto.UserResponse;
import com.herguardian.Backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "https://her-guardian.vercel.app/"
        }
)
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // ---------------- GET LOGGED IN USER ----------------

    @GetMapping("/me")
    public UserResponse getUser(Authentication authentication) {
        return service.getLoggedInUser(authentication);
    }

    // ---------------- REQUEST OTP FOR ACCOUNT ACTION ----------------

    @PostMapping("/request-otp")
    public ResponseEntity<?> requestOtp(Authentication authentication) {
        try {
            service.requestOtp(authentication);
            return ResponseEntity.ok("OTP sent to your registered email");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ---------------- UPDATE PROFILE ----------------

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(Authentication authentication,
                                           @RequestBody UpdateProfileRequest request) {
        try {
            String message = service.updateProfile(authentication, request);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ---------------- CHANGE PASSWORD ----------------

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(Authentication authentication,
                                            @RequestBody ChangePasswordRequest request) {
        try {
            String message = service.changePassword(authentication, request);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ---------------- CHANGE VOICE PHRASE ----------------

    @PutMapping("/change-voice-phrase")
    public ResponseEntity<?> changeVoicePhrase(Authentication authentication,
                                               @RequestBody ChangeVoicePhraseRequest request) {
        try {
            String message = service.changeVoicePhrase(authentication, request);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}