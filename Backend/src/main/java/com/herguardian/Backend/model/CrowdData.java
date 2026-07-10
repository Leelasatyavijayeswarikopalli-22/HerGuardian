package com.herguardian.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrowdData {

    // Average people per square meter
    private double peoplePerSquareMeter;

    // Total crowd records used
    private int samples;
}