package com.herguardian.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private double safetyScore;

    private String status;

    private String recommendation;

    private String bestTimeToTravel;

    private double crimeScore;

    private double lightingScore;

    private double policeScore;

    private double cctvScore;

    private double roadScore;

    private double timeScore;

    private List<Double> predictions;

    private double nearestPoliceDistance;

    private List<String> alerts;

}