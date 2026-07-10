package com.herguardian.Backend.repository;

import com.herguardian.Backend.entity.AreaType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AreaTypeRepository
        extends JpaRepository<AreaType,Long> {
}