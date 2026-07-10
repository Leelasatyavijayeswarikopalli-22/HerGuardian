package com.herguardian.Backend.repository;

import com.herguardian.Backend.entity.CCTV;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CCTVRepository extends JpaRepository<CCTV, Long> {
}