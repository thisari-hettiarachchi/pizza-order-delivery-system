package com.pizzadelivery.pizza_backend.service;

import com.pizzadelivery.pizza_backend.model.Food;
import com.pizzadelivery.pizza_backend.dto.response.FoodResponse;
import com.pizzadelivery.pizza_backend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;



    public FoodResponse addFood(Food food) {

        Optional<Food> existingFood = foodRepository.findByName(food.getName());
        if (existingFood.isPresent()) {
            return new FoodResponse(null, "Food already exists", false);
        }
        foodRepository.save(food);
        return new FoodResponse(food.getName(), "Food added successfully", true);

    }

    public FoodResponse updateFood(Food food) {
        Optional<Food> existingFood = foodRepository.findByName(food.getName());
        if (existingFood.isPresent()) {
            foodRepository.save(food);
            return new FoodResponse(food.getName(), "Food updated successfully", true);
        } else {
            return new FoodResponse(null, "Food not found", false);
        }
    }

    public FoodResponse deleteFood(String name) {
        Optional<Food> existingFood = foodRepository.findByName(name);
        if (existingFood.isPresent()) {
            foodRepository.deleteFoodByName(name);
            return new FoodResponse(name, "Food deleted successfully", true);
        } else {
            return new FoodResponse(null, "Food not found", false);
        }
    }

}
