package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.dto.request.LoginRequest;
import com.pizzadelivery.pizza_backend.model.User;
import com.pizzadelivery.pizza_backend.dto.response.AuthResponse;
import com.pizzadelivery.pizza_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody User user) {
        AuthResponse response = authService.userRegister(user);

        if (response.isSuccess()) {
            // User successfully registered, return CREATED status
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } else if ("Email already exists".equals(response.getMessage())) {
            // Conflict if email already exists
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);

        } else if ("Username already exists".equals(response.getMessage())) {
            // Conflict if username already exists
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);

        } else {
            // Return BAD_REQUEST for any other errors
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }



    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.userLogin(loginRequest.getEmail(), loginRequest.getPassword());

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else if ("Invalid password".equals(response.getMessage())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
