package com.pizzadelivery.pizza_backend.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private String userName;
    private String status = "Food Processing";
    private List<Item> items = new ArrayList<>();
    private String amount;
    private Address address;

    @CreatedDate
    private LocalDateTime date;

    // Default constructor
    public Order() {
        this.date = LocalDateTime.now(); // Set the date when the order is created
    }

    // Constructor with fields
    public Order(String userName, List<Item> items, String amount, Address address) {
        this.userName = userName;
        this.items = items;
        this.amount = amount;
        this.address = address;
        this.date = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
