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

    private static final String API_KEY =
            "f42ea210f5c8455b9b21585bfaaf3c97";

    public CCTVData analyze(RouteSegment segment){

        try{

            double lat =
                    (segment.getStart().getLatitude()
                            + segment.getEnd().getLatitude())/2;

            double lon =
                    (segment.getStart().getLongitude()
                            + segment.getEnd().getLongitude())/2;

            String categories =

                    "service.bank," +

                            "commercial.shopping_mall," +

                            "education.school," +

                            "education.university," +

                            "service.police," +

                            "public_transport";

            String url =

                    "https://api.geoapify.com/v2/places"

                            + "?categories=" + categories

                            + "&filter=circle:"

                            + lon + "," + lat + ",1000"

                            + "&limit=50"

                            + "&apiKey=" + API_KEY;

            String response =

                    restTemplate.getForObject(

                            url,

                            String.class

                    );

            JsonNode root =

                    mapper.readTree(response);

            JsonNode features =

                    root.get("features");

            int count =

                    features == null

                            ? 0

                            : features.size();

            double surveillanceScore;

            if(count >= 12){

                surveillanceScore = 100;

            }
            else if(count >= 9){

                surveillanceScore = 90;

            }
            else if(count >= 6){

                surveillanceScore = 80;

            }
            else if(count >= 4){

                surveillanceScore = 65;

            }
            else if(count >= 2){

                surveillanceScore = 45;

            }
            else{

                surveillanceScore = 20;

            }

            return CCTVData.builder()

                    .cameraCount(count)

                    .camerasPerKm(surveillanceScore)

                    .build();

        }

        catch(Exception e){

            e.printStackTrace();

            return CCTVData.builder()

                    .cameraCount(0)

                    .camerasPerKm(20)

                    .build();

        }

    }

}