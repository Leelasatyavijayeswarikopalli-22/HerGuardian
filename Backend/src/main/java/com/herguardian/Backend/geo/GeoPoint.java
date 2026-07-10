package com.herguardian.Backend.geo;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GeoPoint {

    private double latitude;
    private double longitude;

}