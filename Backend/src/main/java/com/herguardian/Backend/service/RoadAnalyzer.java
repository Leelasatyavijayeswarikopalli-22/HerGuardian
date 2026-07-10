package com.herguardian.Backend.service;

import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.RoadData;
import org.springframework.stereotype.Service;

@Service
public class RoadAnalyzer {

    public RoadData analyze(RouteSegment segment){

        /*
            Temporary implementation.

            Next upgrade:
            - OpenStreetMap Road Status
            - Government Road APIs
            - User Reports
        */

        String condition = "good";

        return RoadData.builder()

                .roadCondition(condition)

                .build();

    }

}