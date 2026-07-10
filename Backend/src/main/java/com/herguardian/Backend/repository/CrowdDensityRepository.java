package com.herguardian.Backend.repository;

import com.herguardian.Backend.entity.CrowdDensity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrowdDensityRepository
        extends JpaRepository<CrowdDensity,Long> {
}