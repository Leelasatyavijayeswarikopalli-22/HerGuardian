package com.herguardian.Backend.engine;

import com.herguardian.Backend.dto.RouteSafetyResult;
import com.herguardian.Backend.dto.SegmentSafetyResult;
import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.*;
import com.herguardian.Backend.service.*;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SafetyRouteEngine {

    private final CrimeAnalyzer crimeAnalyzer;
    private final LightingAnalyzer lightingAnalyzer;
    private final PoliceAnalyzer policeAnalyzer;
    private final SurveillanceAnalyzer cctvAnalyzer;
    private final RoadAnalyzer roadAnalyzer;
    private final TimeAnalyzer timeAnalyzer;

    private final CrimeEngine crimeEngine;
    private final LightingEngine lightingEngine;
    private final PoliceEngine policeEngine;
    private final CCTVEngine cctvEngine;
    private final RoadEngine roadEngine;
    private final TimeEngine timeEngine;

    public SafetyRouteEngine(

            CrimeAnalyzer crimeAnalyzer,
            LightingAnalyzer lightingAnalyzer,
            PoliceAnalyzer policeAnalyzer,
            SurveillanceAnalyzer cctvAnalyzer,
            RoadAnalyzer roadAnalyzer,
            TimeAnalyzer timeAnalyzer,

            CrimeEngine crimeEngine,
            LightingEngine lightingEngine,
            PoliceEngine policeEngine,
            CCTVEngine cctvEngine,
            RoadEngine roadEngine,
            TimeEngine timeEngine

    ) {

        this.crimeAnalyzer = crimeAnalyzer;
        this.lightingAnalyzer = lightingAnalyzer;
        this.policeAnalyzer = policeAnalyzer;
        this.cctvAnalyzer = cctvAnalyzer;
        this.roadAnalyzer = roadAnalyzer;
        this.timeAnalyzer = timeAnalyzer;

        this.crimeEngine = crimeEngine;
        this.lightingEngine = lightingEngine;
        this.policeEngine = policeEngine;
        this.cctvEngine = cctvEngine;
        this.roadEngine = roadEngine;
        this.timeEngine = timeEngine;
    }

    public RouteSafetyResult analyzeRoute(

            int routeNumber,
            List<RouteSegment> segments

    ){

        List<SegmentSafetyResult> result =
                new ArrayList<>();

        double crimeTotal = 0;
        double lightingTotal = 0;
        double policeTotal = 0;
        double cctvTotal = 0;
        double roadTotal = 0;
        double timeTotal = 0;

        for(RouteSegment segment : segments){

            CrimeData crime =
                    crimeAnalyzer.analyze(segment);

            LightingData lighting =
                    lightingAnalyzer.analyze(segment);

            PoliceData police =
                    policeAnalyzer.analyze(segment);

            CCTVData cctv =
                    cctvAnalyzer.analyze(segment);

            RoadData road =
                    roadAnalyzer.analyze(segment);

            TimeData time =
                    timeAnalyzer.analyze(segment);

            double crimeScore =
                    crimeEngine.calculateCrimeScore(
                            crime.getCrimesPerKm2());

            double lightingScore =
                    lightingEngine.calculateLightingScore(
                            time.getTimeCategory().equals("day"),lighting.getStreetLightsPerKm());

            double policeScore =
                    policeEngine.calculatePoliceScore(
                            police.getAverageDistanceKm());

            double cctvScore =
                    cctvEngine.calculateCCTVScore(
                            cctv.getCamerasPerKm());

            double roadScore =
                    roadEngine.calculateRoadScore(
                            road.getRoadCondition());

            double timeScore =
                    timeEngine.calculateTimeScore(
                            time.getTimeCategory());

            double finalScore =

                    crimeScore*0.30 +

                            lightingScore*0.15 +

                            policeScore*0.20 +

                            cctvScore*0.20 +

                            roadScore*0.10 +

                            timeScore*0.05;

            crimeTotal += crimeScore;
            lightingTotal += lightingScore;
            policeTotal += policeScore;
            cctvTotal += cctvScore;
            roadTotal += roadScore;
            timeTotal += timeScore;

            result.add(

                    SegmentSafetyResult.builder()

                            .segment(segment)

                            .crimeScore(crimeScore)
                            .lightingScore(lightingScore)
                            .policeScore(policeScore)
                            .cctvScore(cctvScore)
                            .roadScore(roadScore)
                            .timeScore(timeScore)

                            .finalScore(finalScore)

                            .build()

            );

        }

        int total = result.size();

        double totalSafetyScore =

                (crimeTotal*0.30

                        + lightingTotal*0.15

                        + policeTotal*0.20

                        + cctvTotal*0.20

                        + roadTotal*0.10

                        + timeTotal*0.05)

                        / total;

        return RouteSafetyResult.builder()

                .routeNumber(routeNumber)

                .crimeScore(crimeTotal/total)
                .lightingScore(lightingTotal/total)
                .policeScore(policeTotal/total)
                .cctvScore(cctvTotal/total)
                .roadScore(roadTotal/total)
                .timeScore(timeTotal/total)

                .totalSafetyScore(totalSafetyScore)

                .segments(result)

                .build();

    }

}