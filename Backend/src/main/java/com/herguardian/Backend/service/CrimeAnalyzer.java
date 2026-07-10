package com.herguardian.Backend.service;

import com.herguardian.Backend.model.CrimeData;
import com.herguardian.Backend.geo.RouteSegment;
import org.springframework.stereotype.Service;

@Service
public class CrimeAnalyzer {

    public CrimeData analyze(RouteSegment segment){

        /*
            Temporary AI Simulation.

            Later this will call:

            OpenStreetMap
            Police Crime API
            Government Crime Dataset

        */

        double crimes = Math.random()*200;

        return CrimeData.builder()
                .crimesPerKm2(crimes)
                .totalCrimes((int)crimes)
                .build();

    }

}