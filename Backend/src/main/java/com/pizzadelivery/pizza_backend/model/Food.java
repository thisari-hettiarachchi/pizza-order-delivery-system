package com.pizzadelivery.pizza_backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "foods")
public class Food {
    @Id
    private String id;
    private String name;
    private String image;
    private double price;
    private String description;
    private String category;

}
