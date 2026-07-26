package com.herguardian.Backend.repository;

import com.herguardian.Backend.entity.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Long> {

    Optional<OTP> findByEmail(String email);

    void deleteByEmail(String email);
}