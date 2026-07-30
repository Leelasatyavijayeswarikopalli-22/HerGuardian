package com.herguardian.Backend.service;

import com.herguardian.Backend.exception.OtpDeliveryException;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${resend.from.email}")
    private String senderEmail;

    private Resend resend;

    @PostConstruct
    public void init() {
        this.resend = new Resend(resendApiKey);
    }

    public void sendOtp(String email, String otp) {

        String normalizedEmail = email.trim().toLowerCase();

        String htmlContent =
                "<div style=\"font-family: Arial, sans-serif; line-height: 1.6;\">" +
                        "<p>Hello,</p>" +
                        "<p>Your HerGuardian OTP is: <strong style=\"font-size:18px;\">" + otp + "</strong></p>" +
                        "<p>This OTP is valid for 5 minutes.</p>" +
                        "<p>If you did not request this OTP, please ignore this email.</p>" +
                        "<p>Stay Safe!<br/>HerGuardian Team</p>" +
                        "</div>";

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from(senderEmail)
                .to(normalizedEmail)
                .subject("HerGuardian OTP Verification")
                .html(htmlContent)
                .build();

        try {
            CreateEmailResponse response = resend.emails().send(params);
            log.info("OTP sent successfully to {} (id: {})", normalizedEmail, response.getId());
        } catch (ResendException exception) {
            log.error("Could not send OTP to {}", normalizedEmail, exception);
            throw new OtpDeliveryException("Unable to send OTP email", exception);
        }
    }
}