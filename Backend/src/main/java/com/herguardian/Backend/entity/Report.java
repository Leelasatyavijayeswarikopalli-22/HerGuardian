package com.herguardian.Backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@Table(name="REPORTS")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String category;


    @Column(length = 1000)
    private String description;


    private String location;


    private Double latitude;


    private Double longitude;


    private String status;


    private Integer reportCount;


    private Boolean verified;


    private LocalDateTime reportedAt;


    private LocalDateTime resolvedAt;


    @Column(length = 500)
    private String adminRemark;



    @PrePersist
    public void create(){


        reportedAt=LocalDateTime.now();


        if(status==null){

            status="ACTIVE";

        }


        if(reportCount==null){

            reportCount=1;

        }


        if(verified==null){

            verified=false;

        }

    }


}