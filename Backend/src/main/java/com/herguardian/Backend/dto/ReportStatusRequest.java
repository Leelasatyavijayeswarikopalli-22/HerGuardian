package com.herguardian.Backend.dto;

import lombok.Data;

@Data
public class ReportStatusRequest {

    private String status;
    private String adminRemark;
    private String authorityEmail;
    // This is no longer trusted or required.
    // The backend uses the logged-in authority.
    private String authorityName;
}