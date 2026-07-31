package com.herguardian.Backend.controller;

import com.herguardian.Backend.dto.SOSRequest;
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


    @PostMapping("/trigger")
    public ResponseEntity<?> triggerSOS(

            @RequestBody SOSRequest request

    ) {

        try {

            String googleMapsLink =

                    "https://maps.google.com/?q="
                            + request.getLatitude()
                            + ","
                            + request.getLongitude();


            String alertMessage =

                    "EMERGENCY!!\n\n"

                            + request.getFullName()

                            + " needs immediate help.\n\n"

                            + "Location:\n"

                            + googleMapsLink;


            System.out.println("====================================");

            System.out.println("SOS RECEIVED");

            System.out.println("Name : "
                    + request.getFullName());

            System.out.println("Email : "
                    + request.getEmail());

            System.out.println("Latitude : "
                    + request.getLatitude());

            System.out.println("Longitude : "
                    + request.getLongitude());

            System.out.println("Trigger Phrase : "
                    + request.getTriggerPhrase());

            System.out.println("Timestamp : "
                    + request.getTimestamp());

            System.out.println(alertMessage);

            System.out.println("====================================");


            return ResponseEntity.ok(
                    "SOS Triggered Successfully"
            );

        }

        catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Failed to trigger SOS");

        }

    }

}