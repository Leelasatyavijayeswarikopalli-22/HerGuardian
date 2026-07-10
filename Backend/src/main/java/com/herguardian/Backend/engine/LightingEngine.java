package com.herguardian.Backend.engine;

import org.springframework.stereotype.Component;

@Component
public class LightingEngine {

    public double calculateLightingScore(
            boolean isDay,
            double streetLightsPerKm
    ) {

        if (isDay)
            return 100;

        if (streetLightsPerKm > 35)
            return 100;

        if (streetLightsPerKm >= 25)
            return 85;

        if (streetLightsPerKm >= 15)
            return 70;

        if (streetLightsPerKm >= 10)
            return 50;

        return 30;
    }

}