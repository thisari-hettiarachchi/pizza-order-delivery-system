package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.dto.LoginRequest;
import com.pizzadelivery.pizza_backend.model.User;
import com.pizzadelivery.pizza_backend.model.AuthResponse;
import com.pizzadelivery.pizza_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public AuthResponse registerUser(@RequestBody User user) {
        return userService.userRegister(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        AuthResponse response = userService.userLogin(loginRequest.getEmail(), loginRequest.getPassword());

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else if ("Invalid password".equals(response.getMessage())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
