package com.pizzadelivery.pizza_backend.service;



import pizza_backend.model.Order;
import pizza_backend.repository.OrderRepository;

import java.util.List;
import java.util.Optional;

    public class OrderService {
        private final OrderRepository orderRepository;

        // Constructor-based dependency injection
        public OrderService() {
            this.orderRepository = new OrderRepository();
        }

        // Create a new order
        public Order createOrder(Order order) {
            return orderRepository.saveOrder(order); // Call repository save method
        }

        // Retrieve all orders
        public List<Order> getAllOrders() {
            return orderRepository.findAllOrders();
        }

        // Get order by ID
        public Order getOrderById(String id) {
            Optional<Order> order = orderRepository.findById(id);
            return order.orElse(null);
        }

        // Update order status
        public boolean updateOrderStatus(String id, String newStatus) {
            Optional<Order> orderOpt = orderRepository.findById(id);
            if (orderOpt.isPresent()) {
                Order order = orderOpt.get();
                order.setStatus(newStatus);
                orderRepository.saveOrder(order);
                return true;
            }
            return false;
        }

        // Delete order by ID
        public boolean deleteOrder(String id) {
            return orderRepository.deleteOrderById(id);
        }
    }


