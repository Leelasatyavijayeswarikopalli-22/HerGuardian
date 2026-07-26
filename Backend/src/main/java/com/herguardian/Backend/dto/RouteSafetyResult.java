package com.herguardian.Backend.dto;

import com.herguardian.Backend.geo.GeoPoint;
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

    private double distance;
    private double duration;

    private double crimeScore;
    private double lightingScore;
    private double policeScore;
    private double cctvScore;
    private double roadScore;
    private double timeScore;

    private boolean safest;
    private boolean fastest;

    private List<GeoPoint> coordinates;

    private List<SegmentSafetyResult> segments;

}