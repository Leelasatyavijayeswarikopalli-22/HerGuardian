package com.herguardian.Backend.service.route;

import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.service.map.MapTilerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteProcessingService {

    private final MapTilerService mapTilerService;

    public RouteProcessingService(MapTilerService mapTilerService) {
        this.mapTilerService = mapTilerService;
    }

    public List<List<RouteSegment>> processRoutes(

            double startLat,
            double startLng,
            double endLat,
            double endLng

    ) throws Exception {

        return mapTilerService.getRoutes(
                startLat,
                startLng,
                endLat,
                endLng
        );

    }

}