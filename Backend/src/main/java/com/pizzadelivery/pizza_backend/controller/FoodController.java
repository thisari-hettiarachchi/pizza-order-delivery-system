package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.model.Food;
import com.pizzadelivery.pizza_backend.dto.response.FoodResponse;
import com.pizzadelivery.pizza_backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @PostMapping("/addfood")
    public ResponseEntity<FoodResponse> addFood(@RequestBody Food food) {
        FoodResponse response = foodService.addFood(food);
        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }


    @PutMapping("/updatefood")
    public ResponseEntity<FoodResponse> updateFood(@RequestBody Food food) {
        FoodResponse response = foodService.updateFood(food);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @DeleteMapping("/deletefood")
    public ResponseEntity<FoodResponse> deleteFood(@RequestBody String name) {
        FoodResponse response = foodService.deleteFood(name);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

}
