package com.herguardian.Backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String email, String otp){

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("HerGuardian OTP Verification");

        message.setText(
                "Hello,\n\n" +
                        "Your OTP is : " + otp +
                        "\n\nThis OTP is valid for 5 minutes." +
                        "\n\nStay Safe!\nHerGuardian Team"
        );

        mailSender.send(message);
    }
}