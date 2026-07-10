package com.herguardian.Backend.engine.geopoint;

import com.herguardian.Backend.geo.GeoPoint;
import com.herguardian.Backend.geo.RouteSegment;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeoSamplingService {

    private static final double SAMPLE_DISTANCE = 200;

    public List<RouteSegment> sample(List<GeoPoint> points){

        List<RouteSegment> segments = new ArrayList<>();

        if(points.size() < 2)
            return segments;

        GeoPoint previousPoint = points.get(0);

        double accumulatedDistance = 0;

        for(int i = 1; i < points.size(); i++){

            accumulatedDistance += distance(
                    points.get(i - 1),
                    points.get(i));

            if(accumulatedDistance >= SAMPLE_DISTANCE){

                RouteSegment segment = RouteSegment.builder()
                        .start(previousPoint)
                        .end(points.get(i))
                        .build();

                segments.add(segment);

                previousPoint = points.get(i);

                accumulatedDistance = 0;
            }
        }

        if(!previousPoint.equals(points.get(points.size()-1))){

            RouteSegment lastSegment = RouteSegment.builder()
                    .start(previousPoint)
                    .end(points.get(points.size()-1))
                    .build();

            segments.add(lastSegment);
        }

        return segments;

    }

    private double distance(
            GeoPoint a,
            GeoPoint b){

        double R = 6371000;

        double dLat =
                Math.toRadians(b.getLatitude()-a.getLatitude());

        double dLon =
                Math.toRadians(b.getLongitude()-a.getLongitude());

        double aa =
                Math.sin(dLat/2)*Math.sin(dLat/2)
                        +
                        Math.cos(Math.toRadians(a.getLatitude()))
                                *
                                Math.cos(Math.toRadians(b.getLatitude()))
                                *
                                Math.sin(dLon/2)
                                *
                                Math.sin(dLon/2);

        double c =
                2*Math.atan2(
                        Math.sqrt(aa),
                        Math.sqrt(1-aa));

        return R*c;

    }

}