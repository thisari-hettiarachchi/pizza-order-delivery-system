package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.model.Order;
import com.pizzadelivery.pizza_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository; // Fixed naming

    // Create Order
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderRepository.save(order);
    }

    // Get All Orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get Order by ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable String id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.orElse(null);
    }

    // Update Order Status
    @PutMapping("/{id}/status")
    public Order updateOrderStatus(@PathVariable String id, @RequestParam String status) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }

    // Delete Order
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable String id) {
        orderRepository.deleteById(id);
        return "Order deleted successfully!";
    }
}
