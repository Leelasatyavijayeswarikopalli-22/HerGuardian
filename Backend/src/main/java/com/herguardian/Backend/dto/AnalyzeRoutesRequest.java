package com.herguardian.Backend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyzeRoutesRequest {

    private List<RouteRequest> routes;

}