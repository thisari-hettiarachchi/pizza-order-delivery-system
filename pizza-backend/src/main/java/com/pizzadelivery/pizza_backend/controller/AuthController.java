package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.model.User;
import com.pizzadelivery.pizza_backend.model.AuthResponse;
import com.pizzadelivery.pizza_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public AuthResponse registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/signin")
    public AuthResponse loginUser(@RequestParam String email, @RequestParam String password) {
        return userService.loginUser(email, password);
    }
}
