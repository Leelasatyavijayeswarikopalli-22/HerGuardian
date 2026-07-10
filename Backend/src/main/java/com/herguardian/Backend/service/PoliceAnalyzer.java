package com.herguardian.Backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.PoliceData;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PoliceAnalyzer {

    private final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper mapper = new ObjectMapper();

    public PoliceData analyze(RouteSegment segment){

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

                            "node(around:2000,"+lat+","+lon+")['amenity'='police'];" +

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

            double totalDistance = 0;

            for(JsonNode node:elements){

                double plat = node.get("lat").asDouble();
                double plon = node.get("lon").asDouble();

                totalDistance +=
                        distance(lat,lon,plat,plon);

            }

            double avg =

                    count==0

                            ?100

                            :totalDistance/count;

            return PoliceData.builder()

                    .policeStationCount(count)

                    .averageDistanceKm(avg)

                    .build();

        }

        catch(Exception e){

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
            double lon2){

        double R=6371;

        double dLat=Math.toRadians(lat2-lat1);

        double dLon=Math.toRadians(lon2-lon1);

        double a=Math.sin(dLat/2)*Math.sin(dLat/2)

                +

                Math.cos(Math.toRadians(lat1))

                        *

                        Math.cos(Math.toRadians(lat2))

                        *

                        Math.sin(dLon/2)

                        *

                        Math.sin(dLon/2);

        double c=

                2*Math.atan2(

                        Math.sqrt(a),

                        Math.sqrt(1-a));

        return R*c;

    }

}