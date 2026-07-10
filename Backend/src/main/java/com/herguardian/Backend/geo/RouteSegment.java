package com.herguardian.Backend.geo;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteSegment {

    private GeoPoint start;

    private GeoPoint end;

}