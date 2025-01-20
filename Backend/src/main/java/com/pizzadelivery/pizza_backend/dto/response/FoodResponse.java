package com.pizzadelivery.pizza_backend.dto.response;

public class FoodResponse {
    private String foodName;
    private String message;
    private boolean success;


    public FoodResponse() {}


    public FoodResponse(String foodName, String message, boolean success) {
        this.foodName = foodName;
        this.message = message;
        this.success = success;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }


}
