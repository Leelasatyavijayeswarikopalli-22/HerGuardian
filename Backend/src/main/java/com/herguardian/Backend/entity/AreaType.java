package com.herguardian.Backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AreaType {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    private double latitude;

    private double longitude;

    /*
    residential

    market

    school

    college

    highway

    railway

    busstand

    mall

    hospital

    office

    */

    private String areaType;

}