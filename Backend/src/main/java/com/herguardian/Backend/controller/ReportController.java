package com.herguardian.Backend.controller;

import com.herguardian.Backend.dto.ReportCreateRequest;
import com.herguardian.Backend.dto.ReportStatusRequest;
import com.herguardian.Backend.entity.Report;
import com.herguardian.Backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final ReportService service;

    // USER
    @PostMapping
    public Report save(
            @RequestBody ReportCreateRequest request,
            Authentication authentication
    ) {
        Report report = Report.builder()
                .category(request.getCategory())
                .description(request.getDescription())
                .location(request.getLocation())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .build();

        return service.save(report, authentication);
    }

    // AUTHORITY
    @GetMapping
    public List<Report> getAll(
            Authentication authentication
    ) {
        return service.getAllReports(authentication);
    }

    // USER
    @GetMapping("/user/active")
    public List<Report> getUserActiveReports(
            Authentication authentication
    ) {
        return service.getUserActiveReports(authentication);
    }

    // USER
    @GetMapping("/user/rectified")
    public List<Report> getUserRectifiedReports(
            Authentication authentication
    ) {
        return service.getUserRectifiedReports(authentication);
    }

    // AUTHORITY
    @GetMapping("/active")
    public List<Report> active(
            Authentication authentication
    ) {
        return service.getActiveReports(authentication);
    }

    // AUTHORITY
    @GetMapping("/rectified")
    public List<Report> rectified(
            Authentication authentication
    ) {
        return service.getRectifiedReports(authentication);
    }

    // AUTHORITY
    @PutMapping("/status/{id}")
    public Report updateStatus(
            @PathVariable Long id,
            @RequestBody ReportStatusRequest request,
            Authentication authentication
    ) {
        return service.updateStatus(
                id,
                request.getStatus(),
                request.getAdminRemark(),
                authentication
        );
    }
}