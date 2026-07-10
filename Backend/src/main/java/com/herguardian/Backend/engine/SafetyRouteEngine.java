package com.herguardian.Backend.engine;

import com.herguardian.Backend.dto.RouteSafetyResult;
import com.herguardian.Backend.dto.SegmentSafetyResult;
import com.herguardian.Backend.engine.CrimeEngine;
import com.herguardian.Backend.engine.CrowdEngine;
import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.CrimeData;
import com.herguardian.Backend.model.CrowdData;
import com.herguardian.Backend.service.CrimeAnalyzer;
import com.herguardian.Backend.service.CrowdAnalyzer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SafetyRouteEngine {

    private final CrimeAnalyzer crimeAnalyzer;
    private final CrowdAnalyzer crowdAnalyzer;

    private final CrimeEngine crimeEngine;
    private final CrowdEngine crowdEngine;

    public SafetyRouteEngine(

            CrimeAnalyzer crimeAnalyzer,
            CrowdAnalyzer crowdAnalyzer,

            CrimeEngine crimeEngine,
            CrowdEngine crowdEngine

    ) {

        this.crimeAnalyzer = crimeAnalyzer;
        this.crowdAnalyzer = crowdAnalyzer;

        this.crimeEngine = crimeEngine;
        this.crowdEngine = crowdEngine;

    }

    public RouteSafetyResult analyzeRoute(

            int routeNumber,

            List<RouteSegment> segments

    ) {

        List<SegmentSafetyResult> results =
                new ArrayList<>();

        double crimeTotal = 0;
        double crowdTotal = 0;

        for(RouteSegment segment : segments){

            CrimeData crime =
                    crimeAnalyzer.analyze(segment);

            CrowdData crowd =
                    crowdAnalyzer.analyze(segment);

            double crimeScore =
                    crimeEngine.calculateCrimeScore(
                            crime.getCrimesPerKm2());

            double crowdScore =
                    crowdEngine.calculateCrowdScore(
                            crowd.getPeoplePerSquareMeter());

            double finalScore =
                    (crimeScore*0.25)
                            + (crowdScore*0.15);

            crimeTotal += crimeScore;
            crowdTotal += crowdScore;

            results.add(

                    SegmentSafetyResult.builder()

                            .segment(segment)

                            .crimeScore(crimeScore)

                            .crowdScore(crowdScore)

                            .finalScore(finalScore)

                            .build()

            );

        }

        return RouteSafetyResult.builder()

                .routeNumber(routeNumber)

                .crimeScore(
                        crimeTotal/results.size())

                .crowdScore(
                        crowdTotal/results.size())

                .totalSafetyScore(
                        (crimeTotal*0.25
                                + crowdTotal*0.15)
                                /results.size())

                .segments(results)

                .build();

    }

}