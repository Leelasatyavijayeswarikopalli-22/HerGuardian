package com.herguardian.Backend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteSafetyResult {

    private int routeNumber;

    private double totalSafetyScore;

    private double crimeScore;
    private double crowdScore;
    private double lightingScore;
    private double policeScore;
    private double cctvScore;
    private double roadScore;
    private double timeScore;

    private boolean safest;
    private boolean fastest;

    private List<SegmentSafetyResult> segments;

}