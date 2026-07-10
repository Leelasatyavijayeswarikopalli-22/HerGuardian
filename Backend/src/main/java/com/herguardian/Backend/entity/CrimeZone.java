package com.herguardian.Backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CrimeZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double latitude;

    private double longitude;

    // crimes/km²
    private int crimeDensity;

    private int robbery;

    private int harassment;

    private int theft;

    private int kidnapping;

    private int assault;

}