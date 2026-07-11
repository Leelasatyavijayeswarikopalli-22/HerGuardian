package com.herguardian.Backend.dto;

import com.herguardian.Backend.geo.GeoPoint;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteRequest {

    private int routeNumber;

    private List<GeoPoint> coordinates;

}