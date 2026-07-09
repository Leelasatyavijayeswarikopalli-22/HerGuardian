package com.herguardian.Backend.controller;

import com.herguardian.Backend.dto.UserResponse;
import com.herguardian.Backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/me")
    public UserResponse getUser(Authentication authentication) {

        return service.getLoggedInUser(authentication);

    }
}