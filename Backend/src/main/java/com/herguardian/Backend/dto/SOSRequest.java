package com.herguardian.Backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SOSRequest {

    private String email;

    private String fullName;

    private String emergencyContact1;

    private String emergencyContact2;

    private String emergencyContact3;

    private Double latitude;

    private Double longitude;

    private String timestamp;

    private String triggerPhrase;


}