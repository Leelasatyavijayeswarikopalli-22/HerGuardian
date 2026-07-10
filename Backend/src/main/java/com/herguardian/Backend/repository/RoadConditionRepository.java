package com.herguardian.Backend.repository;

import com.herguardian.Backend.entity.RoadCondition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoadConditionRepository extends JpaRepository<RoadCondition, Long> {
}