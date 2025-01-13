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
@Document(collection = "cart")
public class Cart {
    @Id
    private String id;
    private String userName;
    private String itemId;
    private String itemName;
    private String quantity;
    private String size;
    private String price;

}
