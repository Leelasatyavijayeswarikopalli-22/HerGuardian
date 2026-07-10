package com.herguardian.Backend.geo;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GeoEngine {

    /**
     * Split a route into segments.
     */

    public List<RouteSegment> splitRoute(List<GeoPoint> points) {

        List<RouteSegment> segments = new ArrayList<>();

        if (points.size() < 2)
            return segments;

        for (int i = 0; i < points.size() - 1; i++) {

            segments.add(

                    new RouteSegment(

                            points.get(i),

                            points.get(i + 1)

                    )

            );

        }

        return segments;

    }

}