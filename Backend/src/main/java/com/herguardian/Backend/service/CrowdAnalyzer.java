package com.herguardian.Backend.service;

import com.herguardian.Backend.entity.CrowdDensity;
import com.herguardian.Backend.geo.DistanceUtil;
import com.herguardian.Backend.geo.RouteSegment;
import com.herguardian.Backend.model.CrowdData;
import com.herguardian.Backend.repository.CrowdDensityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CrowdAnalyzer {

    private final CrowdDensityRepository repository;

    public CrowdAnalyzer(CrowdDensityRepository repository) {
        this.repository = repository;
    }

    public CrowdData analyze(RouteSegment segment) {

        List<CrowdDensity> all = repository.findAll();

        double totalDensity = 0;
        int count = 0;

        double centerLat =
                (segment.getStart().getLatitude() +
                        segment.getEnd().getLatitude()) / 2;

        double centerLon =
                (segment.getStart().getLongitude() +
                        segment.getEnd().getLongitude()) / 2;

        for (CrowdDensity crowd : all) {

            double distance = DistanceUtil.distance(

                    centerLat,
                    centerLon,

                    crowd.getLatitude(),
                    crowd.getLongitude()

            );

            if (distance <= 0.20) {

                totalDensity += crowd.getDensity();
                count++;

            }

        }

        if (count == 0) {

            return CrowdData.builder()

                    .peoplePerSquareMeter(0)

                    .samples(0)

                    .build();

        }

        return CrowdData.builder()

                .peoplePerSquareMeter(totalDensity / count)

                .samples(count)

                .build();

    }

}