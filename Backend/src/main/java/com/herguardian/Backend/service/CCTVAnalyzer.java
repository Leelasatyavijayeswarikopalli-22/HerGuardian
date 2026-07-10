package com.herguardian.Backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.CCTVData;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CCTVAnalyzer {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    public CCTVData analyze(RouteSegment segment){

        try{

            double lat =
                    (segment.getStart().getLatitude()
                            + segment.getEnd().getLatitude())/2;

            double lon =
                    (segment.getStart().getLongitude()
                            + segment.getEnd().getLongitude())/2;

            String query =
                    "[out:json];" +
                            "(" +
                            "node(around:500,"+lat+","+lon+")[\"man_made\"=\"surveillance\"];" +
                            ");" +
                            "out;";

            String url =
                    "https://overpass-api.de/api/interpreter?data="+query;

            String response =
                    restTemplate.getForObject(url,String.class);

            JsonNode root =
                    mapper.readTree(response);

            JsonNode elements =
                    root.get("elements");

            int count = elements.size();

            double camerasPerKm = count * 2.0;

            return CCTVData.builder()
                    .cameraCount(count)
                    .camerasPerKm(camerasPerKm)
                    .build();

        }
        catch(Exception e){

            e.printStackTrace();

            return CCTVData.builder()
                    .cameraCount(0)
                    .camerasPerKm(0)
                    .build();

        }

    }

}