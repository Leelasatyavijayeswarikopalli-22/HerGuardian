package com.herguardian.Backend.engine;

import org.springframework.stereotype.Component;

@Component
public class PoliceEngine {

    public double calculatePoliceScore(double averageDistanceKm) {

        if (averageDistanceKm <= 2)
            return 100;

        if (averageDistanceKm <= 3)
            return 80;

        if (averageDistanceKm <= 4)
            return 60;

        if (averageDistanceKm <= 5)
            return 40;

        return 30;
    }

}