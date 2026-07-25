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


    // SAVE REPORT

    public Report save(Report report){

        return repository.save(report);

    }



    // AUTHORITY


    public List<Report> getAllReports(){

        return repository.findAll();

    }



    // AUTHORITY


    public List<Report> getActiveReports(){

        return repository.findByStatusNot(

                "RECTIFIED"

        );

    }



    // AUTHORITY


    public List<Report> getRectifiedReports(){

        return repository.findByStatus(

                "RECTIFIED"

        );

    }



    // USER


    public List<Report> getUserActiveReports(

            String email

    ){

        return repository.

                findByReportedByAndStatusNot(

                        email,

                        "RECTIFIED"

                );

    }



    // USER


    public List<Report> getUserRectifiedReports(

            String email

    ){

        return repository.

                findByReportedByAndStatus(

                        email,

                        "RECTIFIED"

                );

    }



    // AUTHORITY


    public Report updateStatus(

            Long id,
            String status,
            String remark,
            String authorityName

    ){

        Report report=

                repository.findById(id)

                        .orElseThrow();



        report.setStatus(status);

        report.setAdminRemark(

                remark

        );


        report.setAuthorityName(

                authorityName

        );



        if(

                status.equalsIgnoreCase(

                        "RECTIFIED"

                )

        ){

            report.setVerified(true);

            report.setResolvedAt(

                    LocalDateTime.now()

            );

        }

        else{

            report.setVerified(false);

            report.setResolvedAt(

                    null

            );

        }


        return repository.save(

                report

        );


    }


}