package com.herguardian.Backend.dto.maptiler;

import com.herguardian.Backend.geo.RouteSegment;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class RouteResponse {

    private int routeNumber;

    private List<RouteSegment> segments;

}