package com.pizzadelivery.pizza_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String userName;
    private String message;
    private boolean success;
}
