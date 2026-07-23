package com.herguardian.Backend.dto;

import lombok.Data;

@Data
public class ReportStatusRequest {

    private String status;

    private String adminRemark;

    private String authorityName;

}