package com.pizzadelivery.pizza_backend.model;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
@SpringBootApplication
@EnableMongoAuditing  //  Required for @CreatedDate to work


public class Date {



        public static void main(String[] args) {
            SpringApplication.run(Date.class, args);
        }
    }


