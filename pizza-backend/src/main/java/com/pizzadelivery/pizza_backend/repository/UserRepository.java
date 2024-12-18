package com.pizzadelivery.pizza_backend.repository;

import com.pizzadelivery.pizza_backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email); // Custom query for finding a user by email
}
