package com.herguardian.Backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeVoicePhraseRequest {

    private String otp;
    private String currentPassword;
    private String newVoicePhrase;
}