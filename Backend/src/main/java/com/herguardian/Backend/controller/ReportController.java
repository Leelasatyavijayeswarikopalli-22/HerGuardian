package com.herguardian.Backend.controller;


import com.herguardian.Backend.dto.ReportStatusRequest;
import com.herguardian.Backend.entity.Report;
import com.herguardian.Backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/reports")

@RequiredArgsConstructor

@CrossOrigin("*")

public class ReportController {



    private final ReportService service;



    @PostMapping
    public Report save(

            @RequestBody
            Report report

    ){

        return service.save(report);

    }



    @GetMapping
    public List<Report> getAll(){

        return service.getAllReports();

    }



    @GetMapping("/active")
    public List<Report> active(){

        return service.getActiveReports();

    }



    @GetMapping("/rectified")
    public List<Report> rectified(){

        return service.getRectifiedReports();

    }



    @PutMapping("/status/{id}")
    public Report updateStatus(

            @PathVariable
            Long id,

            @RequestBody
            ReportStatusRequest request

    ){

        return service.updateStatus(

                id,

                request.getStatus(),

                request.getAdminRemark(),

                request.getAuthorityName()

        );

    }


}