package com.herguardian.Backend.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PoliceData {

    private int policeStationCount;

    private double averageDistanceKm;

}