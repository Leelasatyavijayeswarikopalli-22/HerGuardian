package com.herguardian.Backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {

    private String fullName;

    private String email;

    private String password;

    private String emergencyContact;

    private String voicePhrase;

}