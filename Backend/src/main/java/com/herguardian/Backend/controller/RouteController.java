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

    public RouteController(
            RouteAnalyzerService routeAnalyzerService){

        this.routeAnalyzerService = routeAnalyzerService;
    }

    @PostMapping("/analyze")
    public List<RouteSafetyResult> analyze(

            @RequestBody
            AnalyzeRoutesRequest request){

        List<RouteSafetyResult> results =
                new ArrayList<>();

        request.getRoutes().forEach(route->{

            results.add(

                    routeAnalyzerService.analyzeRoute(

                            route.getRouteNumber(),

                            route.getCoordinates())

            );

        });

        results.sort(

                Comparator.comparing(
                                RouteSafetyResult::getTotalSafetyScore)

                        .reversed());

        if(!results.isEmpty()){

            results.get(0).setSafest(true);

        }

        return results;

    }

}