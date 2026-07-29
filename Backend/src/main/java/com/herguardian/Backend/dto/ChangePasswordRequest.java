package com.herguardian.Backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {

    private String otp;
    private String currentPassword;
    private String newPassword;
}