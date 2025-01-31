package com.pizzadelivery.pizza_backend.service;

import com.pizzadelivery.pizza_backend.model.Order;
import com.pizzadelivery.pizza_backend.model.Order.OrderStatus;  // Import OrderStatus enum
import com.pizzadelivery.pizza_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    // Constructor-based dependency injection
    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Create a new order
    public Order createOrder(Order order) {
        return orderRepository.save(order); // Save order to MongoDB
    }

    // Retrieve all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get order by ID
    public Order getOrderById(String id) {
        return orderRepository.findById(id).orElse(null);
    }

    // Update order status
    public boolean updateOrderStatus(String id, OrderStatus newStatus) {  // Keep the parameter as OrderStatus enum
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus(newStatus);  // Directly set the enum without converting to string
            orderRepository.save(order);  // Update order in MongoDB
            return true;
        }
        return false;
    }

    // Delete order by ID
    public boolean deleteOrder(String id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
