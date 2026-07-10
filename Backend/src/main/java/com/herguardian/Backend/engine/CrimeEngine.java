package com.herguardian.Backend.engine;

import org.springframework.stereotype.Component;

@Component
public class CrimeEngine {

    public double calculateCrimeScore(double crimesPerKm2) {

        if (crimesPerKm2 < 15)
            return 100;

        if (crimesPerKm2 < 20)
            return 90;

        if (crimesPerKm2 <= 150)
            return 70;

        return 40;
    }

}