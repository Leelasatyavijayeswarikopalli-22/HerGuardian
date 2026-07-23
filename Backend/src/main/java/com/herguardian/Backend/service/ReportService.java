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


        List<Report> reports=

                repository.findAll();



        for(Report item:reports){


            if(

                    item.getCategory().equalsIgnoreCase(

                            report.getCategory()

                    )

                            &&

                            item.getLocation().equalsIgnoreCase(

                                    report.getLocation()

                            )

            ){

                item.setReportCount(

                        item.getReportCount()+1

                );


                return repository.save(item);


            }


        }


        return repository.save(report);


    }



    public List<Report> getAllReports(){

        return repository.findAll();

    }



    public List<Report> getActiveReports(){

        return repository.findByStatusNot("RECTIFIED");

    }



    public List<Report> getRectifiedReports(){

        return repository.findByStatus("RECTIFIED");

    }



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


        report.setAdminRemark(remark);


        report.setAuthorityName(authorityName);



        if(status.equalsIgnoreCase("RECTIFIED")){


            report.setVerified(true);

            report.setResolvedAt(
                    LocalDateTime.now()
            );

        }else{

            report.setResolvedAt(null);

            report.setVerified(false);

        }


        return repository.save(report);


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