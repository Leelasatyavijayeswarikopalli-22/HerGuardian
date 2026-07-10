package com.herguardian.Backend.engine;

import org.springframework.stereotype.Component;

@Component
public class TimeEngine {

    public double calculateTimeScore(String category){

        if(category == null)
            return 70;

        switch (category.toLowerCase()){

            case "day":
                return 100;

            case "night":
                return 80;

            case "early_morning":
                return 70;

            case "late_night":
                return 50;

            default:
                return 70;
        }
    }

}