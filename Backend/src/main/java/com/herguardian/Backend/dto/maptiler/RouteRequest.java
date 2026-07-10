package com.herguardian.Backend.dto.maptiler;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RouteRequest {

    private double startLat;
    private double startLng;

    private double endLat;
    private double endLng;

}