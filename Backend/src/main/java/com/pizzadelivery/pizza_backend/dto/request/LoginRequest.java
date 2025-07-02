package com.pizzadelivery.pizza_backend.dto.request;

public class LoginRequest {
    private String idToken; // Firebase ID Token

    public String getIdToken() {
        return idToken;
    }
    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }
}
