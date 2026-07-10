package com.herguardian.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrimeData {

    // Crimes per square kilometer
    private double crimesPerKm2;

    // Total crimes found near this segment
    private int totalCrimes;

}