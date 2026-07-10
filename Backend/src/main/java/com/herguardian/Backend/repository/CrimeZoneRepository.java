package com.herguardian.Backend.repository;

import com.herguardian.Backend.entity.CrimeZone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrimeZoneRepository extends JpaRepository<CrimeZone, Long> {
}