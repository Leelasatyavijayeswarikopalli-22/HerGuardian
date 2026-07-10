package com.herguardian.Backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CROWD_DENSITY")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CrowdDensity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "crowd_seq")
    @SequenceGenerator(
            name = "crowd_seq",
            sequenceName = "CROWD_SEQ",
            allocationSize = 1
    )
    private Long id;

    private double latitude;

    private double longitude;

    // HH:mm
    private String timeSlot;

    // WEEKDAY / WEEKEND
    private String dayType;

    // persons / m²
    private double density;

}