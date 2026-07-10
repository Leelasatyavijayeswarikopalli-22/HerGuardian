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
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "area_seq")

    @SequenceGenerator(
            name="area_seq",
            sequenceName="AREA_SEQ",
            allocationSize = 1)

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