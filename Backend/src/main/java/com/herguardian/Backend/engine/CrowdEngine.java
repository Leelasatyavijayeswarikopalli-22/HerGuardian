package com.herguardian.Backend.engine;

import org.springframework.stereotype.Component;

@Component
public class CrowdEngine {

    public double calculateCrowdScore(double peoplePerSquareMeter) {

        if (peoplePerSquareMeter < 1)
            return 65;

        if (peoplePerSquareMeter <= 2)
            return 100;

        return 85;
    }

}