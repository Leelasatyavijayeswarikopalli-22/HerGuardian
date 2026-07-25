package com.herguardian.Backend.repository;

import com.herguardian.Backend.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository
        extends JpaRepository<Report,Long> {


    List<Report> findByStatus(

            String status

    );


    List<Report> findByStatusNot(

            String status

    );



    List<Report> findByReportedBy(

            String email

    );



    List<Report>

    findByReportedByAndStatus(

            String email,
            String status

    );



    List<Report>

    findByReportedByAndStatusNot(

            String email,
            String status

    );


}