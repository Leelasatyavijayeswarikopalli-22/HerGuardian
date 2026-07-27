package com.herguardian.Backend.dto;

import lombok.Data;

@Data
public class ReportCreateRequest {

    private String category;
    private String description;
    private String location;
    private Double latitude;
    private Double longitude;
}