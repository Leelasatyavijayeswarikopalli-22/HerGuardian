package com.herguardian.Backend.exception;

public class OtpDeliveryException extends RuntimeException {

    public OtpDeliveryException(String message, Throwable cause) {
        super(message, cause);
    }
}