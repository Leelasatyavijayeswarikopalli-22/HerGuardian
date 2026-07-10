package com.herguardian.Backend.service.map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.herguardian.Backend.engine.geopoint.GeoSamplingService;
import com.herguardian.Backend.engine.geopoint.PolylineDecoder;
import com.herguardian.Backend.geo.GeoPoint;
import com.herguardian.Backend.geo.RouteSegment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class MapTilerService {

    @Value("${maptiler.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    private final ObjectMapper mapper;

    private final PolylineDecoder polylineDecoder;

    private final GeoSamplingService geoSamplingService;

    public MapTilerService(

            RestTemplate restTemplate,

            PolylineDecoder polylineDecoder,

            GeoSamplingService geoSamplingService

    ){

        this.restTemplate = restTemplate;

        this.polylineDecoder = polylineDecoder;

        this.geoSamplingService = geoSamplingService;

        this.mapper = new ObjectMapper();

    }

    public List<List<RouteSegment>> getRoutes(

            double startLat,

            double startLng,

            double endLat,

            double endLng

    ) throws Exception {

        String url =
                "https://api.maptiler.com/routes/v2/directions/"
                        + startLng + "," + startLat + ":"
                        + endLng + "," + endLat
                        + "?alternatives=true"
                        + "&geometry=polyline"
                        + "&key=" + apiKey;

        String json = restTemplate.getForObject(url,String.class);

        JsonNode root = mapper.readTree(json);

        JsonNode routes = root.get("routes");

        List<List<RouteSegment>> result = new ArrayList<>();

        for(JsonNode route : routes){

            String polyline =
                    route.get("geometry").asText();

            List<GeoPoint> points =
                    polylineDecoder.decode(polyline);

            List<RouteSegment> segments =
                    geoSamplingService.sample(points);

            result.add(segments);

        }

        return result;

    }

}