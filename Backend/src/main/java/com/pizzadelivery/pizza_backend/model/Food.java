package com.pizzadelivery.pizza_backend.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "food")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;
    private String image;  // Store image in Base64 or file path
    private Price price;
    private String description;
    private String category;

    // Static Price class with Lombok annotations
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Price {
        private int small;
        private int medium;
        private int large;
    }
}
