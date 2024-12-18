package com.pizzadelivery.pizza_backend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private String token;  // The authentication token (e.g., JWT)
    private String message;  // Message indicating the status (e.g., "Login successful")
    private boolean success; // Indicates if the authentication was successful


    public AuthResponse(String token, String message, boolean success) {
        this.token = token;
        this.message = message;
        this.success = success;
    }
}
