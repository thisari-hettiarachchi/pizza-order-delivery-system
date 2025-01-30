package com.pizzadelivery.pizza_backend.repository;


    import org.springframework.data.mongodb.repository.MongoRepository;

    public interface OrderRepository extends MongoRepository<Order, String> {
        // Custom queries can be added if needed
    }


