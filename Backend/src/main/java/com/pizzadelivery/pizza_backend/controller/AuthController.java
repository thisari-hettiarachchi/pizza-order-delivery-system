package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.dto.response.AuthResponse;
import com.pizzadelivery.pizza_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // This endpoint accepts Firebase ID token in request body
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUser(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, null, "Missing or invalid Authorization header", false));
        }

        String idToken = authHeader.substring(7); // Remove "Bearer "

        AuthResponse response = authService.verifyFirebaseToken(idToken);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}
