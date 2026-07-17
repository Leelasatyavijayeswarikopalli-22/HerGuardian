package com.herguardian.Backend.service;

import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.LightingData;
import org.springframework.stereotype.Service;

@Service
public class LightingAnalyzer {

    public LightingData analyze(RouteSegment segment){

        double lightsPerKm = 28;

        return LightingData.builder()
                .streetLightsPerKm(lightsPerKm)
                .build();

    }

}