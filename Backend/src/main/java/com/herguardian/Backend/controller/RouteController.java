package com.herguardian.Backend.controller;

import com.herguardian.Backend.dto.maptiler.RouteRequest;
import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.service.map.MapTilerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "*")
public class RouteController {

    private final MapTilerService mapTilerService;

    public RouteController(
            MapTilerService mapTilerService
    ) {

        this.mapTilerService = mapTilerService;

    }

    @PostMapping("/all")

    public List<List<RouteSegment>> getRoutes(

            @RequestBody RouteRequest request

    ) throws Exception {

        return mapTilerService.getRoutes(

                request.getStartLat(),
                request.getStartLng(),

                request.getEndLat(),
                request.getEndLng()

        );

    }

}