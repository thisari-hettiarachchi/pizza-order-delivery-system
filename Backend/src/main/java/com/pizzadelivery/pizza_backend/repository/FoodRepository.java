package com.pizzadelivery.pizza_backend.repository;

import com.pizzadelivery.pizza_backend.model.Food;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FoodRepository extends MongoRepository<Food, String> {
}
