package com.herguardian.Backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.CCTVData;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
@Service
public class SurveillanceAnalyzer {

    private final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper mapper = new ObjectMapper();
    @Value("${geoapify.api.key}")
    private String apiKey;


    public CCTVData analyze(RouteSegment segment) {

        try {

            double lat =
                    (segment.getStart().getLatitude()
                            + segment.getEnd().getLatitude()) / 2;

            double lon =
                    (segment.getStart().getLongitude()
                            + segment.getEnd().getLongitude()) / 2;


            String categories =
                            "commercial.shopping_mall," +
                            "education.school," +
                            "education.university," +
                            "service.police," +
                            "healthcare.hospital," +
                            "public_transport," +
                            "commercial.supermarket";


            String url =

                    "https://api.geoapify.com/v2/places"

                            + "?categories=" + categories

                            + "&filter=circle:"

                            + lon + "," + lat + ",1000"

                            + "&limit=50"

                            + "&apiKey=" + apiKey;


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


            int surveillanceScore = 0;


            if (features != null) {

                for (JsonNode feature : features) {

                    String category =

                            feature.get("properties")
                                    .get("categories")
                                    .toString();


                    if (category.contains("service.police")) {

                        surveillanceScore += 20;

                    }

                    else if (category.contains("commercial.bank")) {

                        surveillanceScore += 15;

                    }

                    else if (category.contains("commercial.shopping_mall")) {

                        surveillanceScore += 15;

                    }

                    else if (category.contains("healthcare.hospital")) {

                        surveillanceScore += 12;

                    }

                    else if (category.contains("public_transport.station")) {

                        surveillanceScore += 10;

                    }

                    else if (category.contains("education.university")) {

                        surveillanceScore += 10;

                    }

                    else if (category.contains("education.school")) {

                        surveillanceScore += 8;

                    }

                    else if (category.contains("commercial.supermarket")) {

                        surveillanceScore += 8;

                    }

                    else {

                        surveillanceScore += 5;

                    }

                }

            }


            //maximum score is 100

            surveillanceScore = Math.min(surveillanceScore, 100);


            return CCTVData.builder()

                    .cameraCount(count)

                    .camerasPerKm(surveillanceScore)

                    .build();

        }

        catch (Exception e) {

            e.printStackTrace();

            return CCTVData.builder()

                    .cameraCount(0)

                    .camerasPerKm(20)

                    .build();

        }

    }

}