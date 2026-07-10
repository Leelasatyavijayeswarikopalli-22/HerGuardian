package com.herguardian.Backend.engine;

import org.springframework.stereotype.Component;

@Component
public class CCTVEngine {

    public double calculateCCTVScore(double camerasPerKm) {

        if (camerasPerKm > 40)
            return 100;

        if (camerasPerKm >= 30)
            return 85;

        if (camerasPerKm >= 20)
            return 70;

        if (camerasPerKm >= 10)
            return 50;

        return 40;
    }

}