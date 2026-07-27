package com.herguardian.Backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private String token;
    private String message;

    private Long id;
    private String fullName;
    private String email;

    private String emergencyContact1;
    private String emergencyContact2;
    private String emergencyContact3;

    private String role;
}