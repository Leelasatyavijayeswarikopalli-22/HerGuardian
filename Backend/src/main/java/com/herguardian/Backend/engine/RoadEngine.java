package com.herguardian.Backend.engine;

import org.springframework.stereotype.Component;

@Component
public class RoadEngine {

    public double calculateRoadScore(String roadCondition){

        if(roadCondition == null)
            return 50;

        return switch (roadCondition.toLowerCase()) {
            case "good" -> 100;
            case "potholes" -> 75;
            case "construction" -> 50;
            case "flooded" -> 15;
            case "blocked" -> 0;
            default -> 50;
        };

    }

}