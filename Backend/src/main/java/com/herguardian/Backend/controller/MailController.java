package com.herguardian.Backend.controller;

import com.herguardian.Backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class MailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/mail")
    public String sendMail(@RequestParam String email){

        emailService.sendOtp(email, "123456");

        return "Mail Sent Successfully";
    }

}