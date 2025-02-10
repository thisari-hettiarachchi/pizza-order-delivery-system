package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.model.Order;
import com.pizzadelivery.pizza_backend.model.Order.OrderStatus;
import com.pizzadelivery.pizza_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<String> createOrder(@RequestBody Order order) {
        String sessionUrl = orderService.createStripeSession(order);
        if (sessionUrl != null) {
            return ResponseEntity.ok(sessionUrl);
        } else {
            return ResponseEntity.status(500).body("Failed to create Stripe session");
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Order order = orderService.getOrderById(id);
        return (order != null) ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable String id, @RequestParam OrderStatus status) {
        boolean updated = orderService.updateOrderStatus(id, status);
        return updated ? ResponseEntity.ok(orderService.getOrderById(id)) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable String id) {
        boolean deleted = orderService.deleteOrder(id);
        return deleted ? ResponseEntity.ok("Order deleted successfully!") : ResponseEntity.notFound().build();
    }
}