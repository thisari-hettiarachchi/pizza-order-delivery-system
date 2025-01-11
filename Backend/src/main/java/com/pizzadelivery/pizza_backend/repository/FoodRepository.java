package com.pizzadelivery.pizza_backend.repository;

import com.pizzadelivery.pizza_backend.model.Food;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FoodRepository extends MongoRepository<Food, String> {
    Optional<Food> findByName(String name);
    Optional<Food> deleteFoodByName(String name);


}
