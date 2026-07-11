package com.herguardian.Backend.service;

import com.herguardian.Backend.dto.RouteSafetyResult;
import com.herguardian.Backend.engine.SafetyRouteEngine;
import com.herguardian.Backend.engine.geopoint.GeoSamplingService;
import com.herguardian.Backend.geo.GeoPoint;
import com.herguardian.Backend.geo.RouteSegment;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RouteAnalyzerService {

    private final GeoSamplingService geoSamplingService;
    private final SafetyRouteEngine safetyRouteEngine;

    public RouteAnalyzerService(
            GeoSamplingService geoSamplingService,
            SafetyRouteEngine safetyRouteEngine){

        this.geoSamplingService = geoSamplingService;
        this.safetyRouteEngine = safetyRouteEngine;
    }

    public RouteSafetyResult analyzeRoute(

            int routeNumber,

            List<GeoPoint> coordinates){

        List<RouteSegment> segments =
                geoSamplingService.sample(coordinates);

        return safetyRouteEngine.analyzeRoute(
                routeNumber,
                segments);

    }

}