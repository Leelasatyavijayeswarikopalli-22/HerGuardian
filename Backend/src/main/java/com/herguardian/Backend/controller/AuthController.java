package com.herguardian.Backend.controller;

import com.herguardian.Backend.dto.*;
import com.herguardian.Backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173",
        "http://localhost:5174"})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {

        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestBody VerifyOtpRequest request) {

        return ResponseEntity.ok(authService.verifyOtp(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {

            LoginResponse response = authService.login(request);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(e.getMessage());

        }

    }
    @GetMapping("/voice-phrase/{email}")
    public ResponseEntity<SecretPhraseResponse> getVoicePhrase(
            @PathVariable String email) {

        return ResponseEntity.ok(
                new SecretPhraseResponse(
                        authService.getVoicePhrase(email)
                )
        );
    }
    }