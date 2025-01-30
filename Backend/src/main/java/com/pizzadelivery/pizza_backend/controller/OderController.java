package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.model.Order;
import com.pizzadelivery.pizza_backend.repository.OderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")

public class OderController {




        @Autowired
        private OderRepository orderRepository;

        @PostMapping
        public Order createOrder(@RequestBody Order order) {
            return oderRepository.save(order);
        }

        @GetMapping
        public List<jakarta.persistence.criteria.Order> getAllOrders() {
            return oderRepository.findAll();
        }


}
