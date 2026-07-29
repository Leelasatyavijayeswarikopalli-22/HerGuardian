package com.herguardian.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private String fullName;
    private String email;
    private String emergencyContact1;
    private String emergencyContact2;
    private String emergencyContact3;
    private String voicePhrase;

}
