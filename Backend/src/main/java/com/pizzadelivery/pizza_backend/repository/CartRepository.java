package com.pizzadelivery.pizza_backend.repository;

import com.pizzadelivery.pizza_backend.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends MongoRepository<Cart, String> {
    Optional<Cart> findByUserNameAndItemIdAndSize(String userName, String itemId, String size);
    Optional<List<Cart>> findByUserName(String userName);  // Returns a list of carts for the given username


}
