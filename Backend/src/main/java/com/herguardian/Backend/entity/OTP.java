package com.herguardian.Backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "OTP")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OTP {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "otp_seq")
    @SequenceGenerator(
            name = "otp_seq",
            sequenceName = "OTP_SEQ",
            allocationSize = 1
    )
    private Long id;

    private String email;

    private String otp;

    private LocalDateTime expiryTime;

}