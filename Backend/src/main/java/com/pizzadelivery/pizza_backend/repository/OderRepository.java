package com.pizzadelivery.pizza_backend.repository;


    import org.springframework.data.mongodb.repository.MongoRepository;

    public interface OderRepository extends MongoRepository<Oder, String> {
        // Custom queries can be added if needed
    }


