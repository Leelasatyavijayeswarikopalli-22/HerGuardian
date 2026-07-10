package com.herguardian.Backend.service;

import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.TimeData;
import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
public class TimeAnalyzer {

    public TimeData analyze(RouteSegment segment){

        LocalTime now = LocalTime.now();

        String category;

        if(now.isAfter(LocalTime.of(6,0))
                && now.isBefore(LocalTime.of(18,0))){

            category="day";

        }
        else if(now.isAfter(LocalTime.of(18,0))
                && now.isBefore(LocalTime.of(22,0))){

            category="night";

        }
        else if(now.isAfter(LocalTime.of(22,0))){

            category="late_night";

        }
        else{

            category="early_morning";

        }

        return TimeData.builder()

                .timeCategory(category)

                .build();

    }

}