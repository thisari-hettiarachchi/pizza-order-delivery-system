package com.pizzadelivery.pizza_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class FoodResponse {
    private String foodName;
    private String message;
    private boolean success;
}
