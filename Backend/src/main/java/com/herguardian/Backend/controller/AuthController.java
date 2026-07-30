package com.herguardian.Backend.controller;

import com.herguardian.Backend.dto.LoginRequest;
import com.herguardian.Backend.dto.LoginResponse;
import com.herguardian.Backend.dto.RegisterRequest;
import com.herguardian.Backend.dto.SecretPhraseResponse;
import com.herguardian.Backend.dto.VerifyOtpRequest;
import com.herguardian.Backend.service.AuthService;
import com.herguardian.Backend.service.OtpService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "https://her-guardian.vercel.app/"
        }
)
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    public AuthController(AuthService authService, OtpService otpService) {
        this.authService = authService;
        this.otpService = otpService;
    }

    // ---------------- REGISTER ----------------

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {
        try {
            String response = authService.register(request);
            return ResponseEntity.ok(response);

        } catch (RuntimeException exception) {
            return ResponseEntity
                    .badRequest()
                    .body(exception.getMessage());
        }
    }

    // ---------------- VERIFY REGISTRATION OTP ----------------

    @PostMapping("/verify")
    public ResponseEntity<?> verifyRegistrationOtp(
            @RequestBody VerifyOtpRequest request
    ) {
        try {
            String response = authService.verifyOtp(request);
            return ResponseEntity.ok(response);

        } catch (RuntimeException exception) {
            return ResponseEntity
                    .badRequest()
                    .body(exception.getMessage());
        }
    }

    // ---------------- LOGIN ----------------

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);

        } catch (RuntimeException exception) {
            return ResponseEntity
                    .badRequest()
                    .body(exception.getMessage());
        }
    }

    // ---------------- VERIFY LOGIN OTP ----------------

    @PostMapping("/verify-login-otp")
    public ResponseEntity<?> verifyLoginOtp(
            @RequestBody VerifyOtpRequest request
    ) {
        try {
            // ✅ FIXED: use otpService instance instead of AuthService static call
            otpService.verifyOtp(request.getEmail(), request.getOtp());
            return ResponseEntity.ok("Login OTP Verified Successfully");

        } catch (RuntimeException exception) {
            return ResponseEntity
                    .badRequest()
                    .body(exception.getMessage());
        }
    }

    // ---------------- VOICE PHRASE ----------------

    @GetMapping("/voice-phrase/{email}")
    public ResponseEntity<?> getVoicePhrase(
            @PathVariable String email
    ) {
        try {
            SecretPhraseResponse response =
                    new SecretPhraseResponse(
                            authService.getVoicePhrase(email)
                    );

            return ResponseEntity.ok(response);

        } catch (RuntimeException exception) {
            return ResponseEntity
                    .badRequest()
                    .body(exception.getMessage());
        }
    }
}