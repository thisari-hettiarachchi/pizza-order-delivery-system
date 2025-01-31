package com.pizzadelivery.pizza_backend.model;

public class OrderItem {
    private String productId;
    private int quantity;

    // Constructor
    public OrderItem() {}

    public OrderItem(String productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    // Getters and Setters
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
