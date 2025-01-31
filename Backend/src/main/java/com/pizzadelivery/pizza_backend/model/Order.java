package com.pizzadelivery.pizza_backend.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private String userId;
    private String status = "Food Processing";
    private List<OrderItem> items = new ArrayList<>();
    private Double amount;
    private Address address;

    @CreatedDate  // Requires @EnableMongoAuditing in the main application
    private Date date;

    // Default Constructor
    public Order() {
        this.date = new Date();
    }

    // Parameterized Constructor
    public Order(String userId, List<OrderItem> items, double amount, Address address) {
        this.userId = userId;
        this.items = (items != null) ? items : new ArrayList<>();
        this.amount = amount;
        this.address = address;
        this.date = new Date();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = (items != null) ? items : new ArrayList<>(); }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
}
