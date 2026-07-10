package com.herguardian.Backend.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CCTVData {

    private int cameraCount;

    private double camerasPerKm;

}