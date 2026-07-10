package com.herguardian.Backend.dto;

import com.herguardian.Backend.geo.RouteSegment;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SegmentSafetyResult {

    private RouteSegment segment;

    private double crimeScore;

    private double crowdScore;

    private double lightingScore;

    private double policeScore;

    private double cctvScore;

    private double roadScore;

    private double timeScore;

    private double finalScore;

}