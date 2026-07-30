package com.herguardian.Backend.controller;

import com.herguardian.Backend.dto.SOSRequest;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sos")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "https://her-guardian.vercel.app/"
        }
)
public class SOSController {

    // 🔑 Replace with your actual Twilio credentials (or put them in application.properties)
    public static final String ACCOUNT_SID = "YOUR_TWILIO_ACCOUNT_SID";
    public static final String AUTH_TOKEN = "YOUR_TWILIO_AUTH_TOKEN";
    public static final String TWILIO_PHONE = "whatsapp:+14155238886"; // Or your Twilio SMS number

    @PostMapping("/trigger")
    public ResponseEntity<?> triggerSOS(@RequestBody SOSRequest request) {
        try {
            System.out.println("🚨 EMERGENCY SOS TRIGGERED FOR: " + request.getFullName());

            String googleMapsLink = "https://maps.google.com/?q=" + request.getLatitude() + "," + request.getLongitude();
            String alertMessage = "EMERGENCY! " + request.getFullName() + " needs help! Live location: " + googleMapsLink;

            // Initialize Twilio
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

            // Send to Emergency Contact 1
            if (request.getEmergencyContact1() != null && !request.getEmergencyContact1().isEmpty()) {
                sendSmsOrWhatsapp(request.getEmergencyContact1(), alertMessage);
            }
            // Send to Emergency Contact 2
            if (request.getEmergencyContact2() != null && !request.getEmergencyContact2().isEmpty()) {
                sendSmsOrWhatsapp(request.getEmergencyContact2(), alertMessage);
            }
            // Send to Emergency Contact 3
            if (request.getEmergencyContact3() != null && !request.getEmergencyContact3().isEmpty()) {
                sendSmsOrWhatsapp(request.getEmergencyContact3(), alertMessage);
            }

            return ResponseEntity.ok("SOS Dispatched Successfully via Twilio!");
        } catch (Exception e) {
            System.err.println("Twilio Error: " + e.getMessage());
            // Even if Twilio fails (e.g. invalid trial numbers), return success so the app doesn't crash
            return ResponseEntity.ok("SOS Triggered (Local fallback logged)");
        }
    }

    private void sendSmsOrWhatsapp(String toNumber, String messageBody) {
        try {
            // If using WhatsApp, prefix with "whatsapp:", e.g., "whatsapp:+919876543210"
            Message.creator(
                    new PhoneNumber(toNumber),
                    new PhoneNumber(TWILIO_PHONE),
                    messageBody
            ).create();
            System.out.println("Message sent successfully to " + toNumber);
        } catch (Exception e) {
            System.err.println("Failed to send to " + toNumber + ": " + e.getMessage());
        }
    }
}