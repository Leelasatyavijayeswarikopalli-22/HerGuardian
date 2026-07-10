package com.herguardian.Backend.repository;

import com.herguardian.Backend.entity.PoliceStation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoliceStationRepository extends JpaRepository<PoliceStation, Long> {
}