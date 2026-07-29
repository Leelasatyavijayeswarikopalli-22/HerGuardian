package com.herguardian.Backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {

    private String otp;
    private String fullName;
    private String emergencyContact1;
    private String emergencyContact2;
    private String emergencyContact3;
}