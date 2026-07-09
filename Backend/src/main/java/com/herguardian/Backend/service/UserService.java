package com.herguardian.Backend.service;

import com.herguardian.Backend.dto.UserResponse;
import com.herguardian.Backend.entity.User;
import com.herguardian.Backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

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
}