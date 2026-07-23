package com.herguardian.Backend.service;


import com.herguardian.Backend.entity.Report;
import com.herguardian.Backend.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ReportService {


    private final ReportRepository repository;



    public Report save(Report report){

        return repository.save(report);

    }


    public List<Report> getAllReports(){

        return repository.findAll();

    }



    public List<Report> getActiveReports(){

        return repository.findByStatus("ACTIVE");

    }


    public List<Report> getRectifiedReports(){

        return repository.findByStatus("RECTIFIED");

    }



    public Report rectify(Long id){


        Report report=

                repository.findById(id)

                        .orElseThrow();


        report.setStatus("RECTIFIED");

        report.setVerified(true);

        report.setResolvedAt(

                LocalDateTime.now()

        );


        report.setAdminRemark(

                "Issue Resolved Successfully"

        );


        return repository.save(report);


    }


}