package com.herguardian.Backend.controller;

import com.herguardian.Backend.dto.DashboardResponse;
import com.herguardian.Backend.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {


    private final DashboardService
            dashboardService;


    public DashboardController(

            DashboardService
                    dashboardService

    ) {

        this.dashboardService =
                dashboardService;

    }


    @GetMapping
    public DashboardResponse dashboard(

            @RequestParam double lat,

            @RequestParam double lon

    ) {

        return dashboardService
                .getDashboard(

                        lat,
                        lon

                );

    }
}