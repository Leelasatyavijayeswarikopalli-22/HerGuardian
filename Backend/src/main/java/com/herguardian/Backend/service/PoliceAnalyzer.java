package com.herguardian.Backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.PoliceData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PoliceAnalyzer {

    @Value("${geoapify.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper mapper = new ObjectMapper();

    public PoliceData analyze(RouteSegment segment) {

        try {

            double lat =
                    (segment.getStart().getLatitude()
                            + segment.getEnd().getLatitude()) / 2;

            double lon =
                    (segment.getStart().getLongitude()
                            + segment.getEnd().getLongitude()) / 2;

            String url =
                    "https://api.geoapify.com/v2/places" +
                            "?categories=service.police" +
                            "&filter=circle:" +
                            lon + "," + lat + ",5000" +
                            "&limit=20" +
                            "&apiKey=" + apiKey;

            String response =
                    restTemplate.getForObject(url, String.class);

            JsonNode root =
                    mapper.readTree(response);

            JsonNode features =
                    root.get("features");

            int count = features.size();

            double totalDistance = 0;

            for (JsonNode feature : features) {

                JsonNode coordinates =
                        feature.get("geometry")
                                .get("coordinates");

                double policeLon =
                        coordinates.get(0).asDouble();

                double policeLat =
                        coordinates.get(1).asDouble();

                totalDistance +=
                        distance(
                                lat,
                                lon,
                                policeLat,
                                policeLon
                        );

            }

            double avgDistance =
                    count == 0
                            ? 100
                            : totalDistance / count;

            return PoliceData.builder()
                    .policeStationCount(count)
                    .averageDistanceKm(avgDistance)
                    .build();

        }

        catch (Exception e) {

            e.printStackTrace();

            return PoliceData.builder()
                    .policeStationCount(0)
                    .averageDistanceKm(100)
                    .build();

        }

    }

    private double distance(
            double lat1,
            double lon1,
            double lat2,
            double lon2) {

        double R = 6371;

        double dLat =
                Math.toRadians(lat2 - lat1);

        double dLon =
                Math.toRadians(lon2 - lon1);

        double a =
                Math.sin(dLat / 2) *
                        Math.sin(dLat / 2)
                        +
                        Math.cos(Math.toRadians(lat1))
                                *
                                Math.cos(Math.toRadians(lat2))
                                *
                                Math.sin(dLon / 2)
                                *
                                Math.sin(dLon / 2);

        double c =
                2 *
                        Math.atan2(
                                Math.sqrt(a),
                                Math.sqrt(1 - a));

        return R * c;

    }

}