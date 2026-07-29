package com.herguardian.Backend.dto;

public class SOSRequest {
    private String email;
    private String fullName;
    private String emergencyContact1;
    private String emergencyContact2;
    private String emergencyContact3;
    private Double latitude;
    private Double longitude;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmergencyContact1() { return emergencyContact1; }
    public void setEmergencyContact1(String emergencyContact1) { this.emergencyContact1 = emergencyContact1; }
    public String getEmergencyContact2() { return emergencyContact2; }
    public void setEmergencyContact2(String emergencyContact2) { this.emergencyContact2 = emergencyContact2; }
    public String getEmergencyContact3() { return emergencyContact3; }
    public void setEmergencyContact3(String emergencyContact3) { this.emergencyContact3 = emergencyContact3; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
}