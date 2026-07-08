package com.herguardian.Backend.dto;

import lombok.*;

@Getter
@Setter
public class RegisterRequest {

    private String fullName;
    private String email;
    private String password;
    private String emergencyContact;
    private String voicePhrase;
}