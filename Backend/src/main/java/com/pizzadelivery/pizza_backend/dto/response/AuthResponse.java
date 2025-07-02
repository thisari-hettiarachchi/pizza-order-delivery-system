package com.pizzadelivery.pizza_backend.dto.response;

public class AuthResponse {

    private String token; // Optional, you can omit or keep for compatibility
    private String userName;
    private String message;
    private boolean success;

    public AuthResponse() {}

    public AuthResponse(String token, String userName, String message, boolean success) {
        this.token = token;
        this.userName = userName;
        this.message = message;
        this.success = success;
    }

    // Getters and setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
}
