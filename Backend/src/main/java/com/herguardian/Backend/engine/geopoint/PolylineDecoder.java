package com.herguardian.Backend.engine.geopoint;

import com.herguardian.Backend.geo.GeoPoint;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class PolylineDecoder {

    public static List<GeoPoint> decode(String encoded) {

        List<GeoPoint> poly = new ArrayList<>();

        int index = 0;
        int lat = 0;
        int lng = 0;

        while (index < encoded.length()) {

            int b;
            int shift = 0;
            int result = 0;

            do {
                b = encoded.charAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            int dlat =
                    ((result & 1) != 0)
                            ? ~(result >> 1)
                            : (result >> 1);

            lat += dlat;

            shift = 0;
            result = 0;

            do {
                b = encoded.charAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            int dlng =
                    ((result & 1) != 0)
                            ? ~(result >> 1)
                            : (result >> 1);

            lng += dlng;

            poly.add(
                    new GeoPoint(
                            lat / 1E5,
                            lng / 1E5
                    )
            );
        }

        return poly;

    }

}