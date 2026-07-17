package com.herguardian.Backend.service;

import com.herguardian.Backend.dto.DashboardResponse;
import com.herguardian.Backend.geo.GeoPoint;
import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.*;
import com.herguardian.Backend.engine.*;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {


    private final PredictionService predictionService;

    private final RecommendationService recommendationService;

    private final CrimeAnalyzer crimeAnalyzer;
    private final CrowdAnalyzer crowdAnalyzer;
    private final LightingAnalyzer lightingAnalyzer;
    private final PoliceAnalyzer policeAnalyzer;
    private final SurveillanceAnalyzer cctvAnalyzer;
    private final RoadAnalyzer roadAnalyzer;
    private final TimeAnalyzer timeAnalyzer;


    private final CrimeEngine crimeEngine;
    private final CrowdEngine crowdEngine;
    private final LightingEngine lightingEngine;
    private final PoliceEngine policeEngine;
    private final CCTVEngine cctvEngine;
    private final RoadEngine roadEngine;
    private final TimeEngine timeEngine;



    public DashboardService(

            PredictionService predictionService,
            RecommendationService recommendationService,

            CrimeAnalyzer crimeAnalyzer,
            CrowdAnalyzer crowdAnalyzer,
            LightingAnalyzer lightingAnalyzer,
            PoliceAnalyzer policeAnalyzer,
            SurveillanceAnalyzer cctvAnalyzer,
            RoadAnalyzer roadAnalyzer,
            TimeAnalyzer timeAnalyzer,

            CrimeEngine crimeEngine,
            CrowdEngine crowdEngine,
            LightingEngine lightingEngine,
            PoliceEngine policeEngine,
            CCTVEngine cctvEngine,
            RoadEngine roadEngine,
            TimeEngine timeEngine


    ){

        this.predictionService=
                predictionService;

        this.recommendationService=
                recommendationService;

        this.crimeAnalyzer=
                crimeAnalyzer;

        this.crowdAnalyzer=
                crowdAnalyzer;

        this.lightingAnalyzer=
                lightingAnalyzer;

        this.policeAnalyzer=
                policeAnalyzer;

        this.cctvAnalyzer=
                cctvAnalyzer;

        this.roadAnalyzer=
                roadAnalyzer;

        this.timeAnalyzer=
                timeAnalyzer;


        this.crimeEngine=
                crimeEngine;

        this.crowdEngine=
                crowdEngine;

        this.lightingEngine=
                lightingEngine;

        this.policeEngine=
                policeEngine;

        this.cctvEngine=
                cctvEngine;

        this.roadEngine=
                roadEngine;

        this.timeEngine=
                timeEngine;


    }




    public DashboardResponse getDashboard(

            double latitude,
            double longitude

    ){


        GeoPoint point=

                GeoPoint.builder()

                        .latitude(latitude)
                        .longitude(longitude)

                        .build();


        RouteSegment segment=

                RouteSegment.builder()

                        .start(point)
                        .end(point)

                        .build();



        CrimeData crime=
                crimeAnalyzer.analyze(segment);

        CrowdData crowd=
                crowdAnalyzer.analyze(segment);

        LightingData lighting=
                lightingAnalyzer.analyze(segment);

        PoliceData police=
                policeAnalyzer.analyze(segment);

        CCTVData cctv=
                cctvAnalyzer.analyze(segment);

        RoadData road=
                roadAnalyzer.analyze(segment);

        TimeData time=
                timeAnalyzer.analyze(segment);



        double crimeScore=

                crimeEngine.calculateCrimeScore(

                        crime.getCrimesPerKm2()

                );


        double crowdScore=

                crowdEngine.calculateCrowdScore(

                        crowd.getPeoplePerSquareMeter()

                );


        double lightingScore=

                lightingEngine.calculateLightingScore(

                        time.getTimeCategory()
                                .equals("day"),

                        lighting.getStreetLightsPerKm()

                );


        double policeScore=

                policeEngine.calculatePoliceScore(

                        police.getAverageDistanceKm()

                );


        double cctvScore=

                cctvEngine.calculateCCTVScore(

                        cctv.getCamerasPerKm()

                );


        double roadScore=

                roadEngine.calculateRoadScore(

                        road.getRoadCondition()

                );


        double timeScore=

                timeEngine.calculateTimeScore(

                        time.getTimeCategory()

                );



        double safetyScore=


                crimeScore*0.25 +

                        crowdScore*0.15 +

                        lightingScore*0.15 +

                        policeScore*0.15 +

                        cctvScore*0.15 +

                        roadScore*0.10 +

                        timeScore*0.05;



        String status=

                recommendationService
                        .getStatus(
                                safetyScore
                        );


        String recommendation=

                recommendationService
                        .getRecommendation(

                                safetyScore,

                                time.getTimeCategory()

                        );


        String bestTime=

                recommendationService
                        .getBestTime(
                                safetyScore
                        );


        List<String> alerts=
                new ArrayList<>();


        alerts.add(recommendation);

        alerts.add(

                "Emergency SOS is active."

        );


        alerts.add(

                "Live location sharing is available."

        );



        return DashboardResponse

                .builder()

                .safetyScore(
                        safetyScore
                )

                .status(
                        status
                )

                .recommendation(
                        recommendation
                )

                .bestTimeToTravel(
                        bestTime
                )

                .weather(
                        "CLEAR SKY"
                )

                .crimeScore(
                        crimeScore
                )

                .crowdScore(
                        crowdScore
                )

                .lightingScore(
                        lightingScore
                )

                .policeScore(
                        policeScore
                )

                .cctvScore(
                        cctvScore
                )

                .roadScore(
                        roadScore
                )

                .timeScore(
                        timeScore
                )

                .nearestPoliceDistance(

                        police.getAverageDistanceKm()

                )

                .nearestHospitalDistance(
                        1.0
                )

                .alerts(
                        alerts
                )

                .predictions(

                        predictionService
                                .predict(
                                        safetyScore
                                )

                )

                .build();



    }


}