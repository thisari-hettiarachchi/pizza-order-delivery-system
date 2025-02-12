package com.pizzadelivery.pizza_backend.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private String userName;
    private OrderStatus status = OrderStatus.FOOD_PROCESSING;
    private List<Item> items = new ArrayList<>();
    private BigDecimal totalPrice;
    private String discount;
    private BigDecimal deliveryFee;
    private BigDecimal lastTotalPrice;
    private Address address;
    private String contactNumber;
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @CreatedDate
    private LocalDateTime date;

    public Order() {
        this.date = LocalDateTime.now();
    }

    public Order(String userName, List<Item> items, BigDecimal totalPrice, String discount, BigDecimal deliveryFee, BigDecimal lastTotalPrice, Address address, String contactNumber) {
        this.userName = userName;
        this.items = items;
        this.totalPrice = totalPrice;
        this.discount = discount;
        this.deliveryFee = deliveryFee;
        this.lastTotalPrice = lastTotalPrice;
        this.address = address;
        this.contactNumber = contactNumber;
        this.date = LocalDateTime.now();
        this.status = OrderStatus.FOOD_PROCESSING;
        this.paymentStatus = PaymentStatus.PENDING;
    }

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

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public List<Item> getItems() {
        return new ArrayList<>(items);
    }

    public void setItems(List<Item> items) {
        this.items = new ArrayList<>(items);
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getDiscount() {
        return discount;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public BigDecimal getDeliveryFee() {
        return deliveryFee;
    }

    public void setDeliveryFee(BigDecimal deliveryFee) {
        this.deliveryFee = deliveryFee;
    }

    public BigDecimal getLastTotalPrice() {
        return lastTotalPrice;
    }

    public void setLastTotalPrice(BigDecimal lastTotalPrice) {
        this.lastTotalPrice = lastTotalPrice;
    }


    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public enum PaymentStatus {
        PENDING,
        COMPLETED
    }

    public enum OrderStatus {
        FOOD_PROCESSING,
        DISPATCHED,
        DELIVERED
    }
}
