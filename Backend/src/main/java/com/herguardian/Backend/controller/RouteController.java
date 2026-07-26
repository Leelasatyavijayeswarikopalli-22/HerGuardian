package com.herguardian.Backend.controller;

import com.herguardian.Backend.dto.AnalyzeRoutesRequest;
import com.herguardian.Backend.dto.RouteSafetyResult;
import com.herguardian.Backend.service.RouteAnalyzerService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin("*")
public class RouteController {

    private final RouteAnalyzerService routeAnalyzerService;

    public RouteController(RouteAnalyzerService routeAnalyzerService) {
        this.routeAnalyzerService = routeAnalyzerService;
    }

    @PostMapping("/analyze")
    public List<RouteSafetyResult> analyze(@RequestBody AnalyzeRoutesRequest request) {

        List<RouteSafetyResult> results = new ArrayList<>();
        double minDuration = Double.MAX_VALUE;

        // 1. Analyze all route geometries using your real engine
        request.getRoutes().forEach(route -> {
            RouteSafetyResult res = routeAnalyzerService.analyzeRoute(
                    route.getRouteNumber(),
                    route.getCoordinates()
            );

            // Retain route properties for React UI
            res.setDistance(route.getDistance());
            res.setDuration(route.getDuration());
            res.setCoordinates(route.getCoordinates());

            results.add(res);
        });

        // 2. Find minimum duration for fastest badge
        for (RouteSafetyResult r : results) {
            if (r.getDuration() < minDuration) {
                minDuration = r.getDuration();
            }
        }

        // 3. Sort descending by Total Safety Score (Highest/Safest first)
        results.sort(Comparator.comparing(RouteSafetyResult::getTotalSafetyScore).reversed());

        // 4. Assign badges based on actual computations
        for (int i = 0; i < results.size(); i++) {
            RouteSafetyResult res = results.get(i);
            res.setSafest(i == 0); // Highest score gets Safest tag
            res.setFastest(res.getDuration() == minDuration && results.size() > 1); // Quickest tag
        }

        return results;
    }
}