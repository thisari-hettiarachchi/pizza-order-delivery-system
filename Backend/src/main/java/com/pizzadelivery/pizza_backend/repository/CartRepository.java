package com.pizzadelivery.pizza_backend.repository;

import com.pizzadelivery.pizza_backend.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CartRepository extends MongoRepository<Cart, String> {
    Optional<Cart> findByUserName(String userName);
    void deleteByUserName(String username);
}
