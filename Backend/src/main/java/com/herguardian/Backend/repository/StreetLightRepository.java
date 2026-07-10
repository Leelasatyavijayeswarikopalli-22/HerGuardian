package com.herguardian.Backend.repository;

import com.herguardian.Backend.entity.StreetLight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StreetLightRepository extends JpaRepository<StreetLight, Long> {
}