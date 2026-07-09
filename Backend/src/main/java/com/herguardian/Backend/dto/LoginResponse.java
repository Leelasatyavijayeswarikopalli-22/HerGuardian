package com.herguardian.Backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private String token;

    private String message;

    private String fullName;

    private String email;

    private String emergencyContact1;

    private String emergencyContact2;

    private String emergencyContact3;

}