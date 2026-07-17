package com.herguardian.Backend.controller;

import com.herguardian.Backend.engine.*;
import com.herguardian.Backend.geo.GeoPoint;
import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.*;
import com.herguardian.Backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final CrimeAnalyzer crimeAnalyzer;
    private final CrimeEngine crimeEngine;

    private final CrowdAnalyzer crowdAnalyzer;
    private final CrowdEngine crowdEngine;

    public TestController(
            CrimeAnalyzer crimeAnalyzer,
            CrimeEngine crimeEngine,
            CrowdAnalyzer crowdAnalyzer,
            CrowdEngine crowdEngine
    ) {

        this.crimeAnalyzer = crimeAnalyzer;
        this.crimeEngine = crimeEngine;

        this.crowdAnalyzer = crowdAnalyzer;
        this.crowdEngine = crowdEngine;
    }

    @GetMapping("/api/test/crime")
    public CrimeData crimeTest() {

        RouteSegment segment = RouteSegment.builder()
                .start(new GeoPoint(16.989,82.247))
                .end(new GeoPoint(16.990,82.248))
                .build();

        CrimeData data = crimeAnalyzer.analyze(segment);

        double score =
                crimeEngine.calculateCrimeScore(
                        data.getCrimesPerKm2());

        System.out.println("Crime Score = " + score);

        return data;
    }

    @GetMapping("/api/test/crowd")
    public CrowdData crowdTest() {

        RouteSegment segment = RouteSegment.builder()
                .start(new GeoPoint(16.989,82.247))
                .end(new GeoPoint(16.990,82.248))
                .build();

        CrowdData data = crowdAnalyzer.analyze(segment);

        double score =
                crowdEngine.calculateCrowdScore(
                        data.getPeoplePerSquareMeter());

        System.out.println("Crowd Score = " + score);

        return data;
    }
    @Autowired
    private LightingAnalyzer lightingAnalyzer;

    @Autowired
    private LightingEngine lightingEngine;
    @GetMapping("/api/test/lighting")
    public LightingData lightingTest(){

        RouteSegment segment = RouteSegment.builder()

                .start(new GeoPoint(16.989,82.247))

                .end(new GeoPoint(16.990,82.248))

                .build();

        LightingData data =
                lightingAnalyzer.analyze(segment);

        double score =
                lightingEngine.calculateLightingScore(
                        false,data.getStreetLightsPerKm());

        System.out.println("Lighting Score = "+score);

        return data;

    }
    @Autowired
    private PoliceAnalyzer policeAnalyzer;

    @Autowired
    private PoliceEngine policeEngine;

    @GetMapping("/api/test/police")
    public PoliceData policeTest(){

        RouteSegment segment = RouteSegment.builder()

                .start(new GeoPoint(16.989,82.247))

                .end(new GeoPoint(16.990,82.248))

                .build();

        PoliceData data =
                policeAnalyzer.analyze(segment);

        double score =
                policeEngine.calculatePoliceScore(
                        data.getAverageDistanceKm());

        System.out.println("Police Score = "+score);

        return data;

    }

    @Autowired
    private SurveillanceAnalyzer cctvAnalyzer;

    @Autowired
    private CCTVEngine cctvEngine;

    @GetMapping("/api/test/cctv")
    public CCTVData cctvTest(){

        RouteSegment segment = RouteSegment.builder()

                .start(new GeoPoint(16.989,82.247))

                .end(new GeoPoint(16.990,82.248))

                .build();

        CCTVData data =
                cctvAnalyzer.analyze(segment);

        double score =
                cctvEngine.calculateCCTVScore(
                        data.getCamerasPerKm());

        System.out.println("CCTV Score = " + score);

        return data;

    }

    @Autowired
    private RoadAnalyzer roadAnalyzer;

    @Autowired
    private RoadEngine roadEngine;

    @GetMapping("/api/test/road")
    public RoadData roadTest(){

        RouteSegment segment = RouteSegment.builder()

                .start(new GeoPoint(16.989,82.247))

                .end(new GeoPoint(16.990,82.248))

                .build();

        RoadData data =
                roadAnalyzer.analyze(segment);

        double score =
                roadEngine.calculateRoadScore(
                        data.getRoadCondition());

        System.out.println("Road Score = " + score);

        return data;

    }
    @Autowired
    private TimeAnalyzer timeAnalyzer;

    @Autowired
    private TimeEngine timeEngine;

    @GetMapping("/api/test/time")
    public TimeData timeTest(){

        RouteSegment segment = RouteSegment.builder()

                .start(new GeoPoint(16.989,82.247))

                .end(new GeoPoint(16.990,82.248))

                .build();

        TimeData data =
                timeAnalyzer.analyze(segment);

        double score =
                timeEngine.calculateTimeScore(
                        data.getTimeCategory());

        System.out.println("Time Score = " + score);

        return data;

    }
}