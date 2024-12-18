package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.model.AuthResponse;
import com.pizzadelivery.pizza_backend.model.User;
import com.pizzadelivery.pizza_backend.service.UserService;
import com.pizzadelivery.pizza_backend.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class AuthController {

    @Autowired
    private UserService userService;

    // Sign Up
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@RequestBody User user) {
        // Check if the email already exists in the database
        if (userService.isEmailTaken(user.getEmail())) {
            // Return a bad request response with a custom error message
            AuthResponse authResponse = new AuthResponse(null, "Email already taken", false);
            return ResponseEntity.badRequest().body(authResponse);  // Return AuthResponse
        }

        try {
            // Proceed with user registration
            User newUser = userService.signUp(user);
            // Generate JWT token for the new user (assuming this is handled in the service)
            String token = generateJwtToken(newUser.getEmail());
            AuthResponse authResponse = new AuthResponse(token, "Sign-up successful", true);
            return ResponseEntity.ok(authResponse);  // Successfully signed up with token
        } catch (IllegalArgumentException e) {
            // If an error occurs during the process, return a bad request response
            AuthResponse authResponse = new AuthResponse(null, "Error during sign-up", false);
            return ResponseEntity.badRequest().body(authResponse);  // Return error message in AuthResponse
        }
    }

    // Sign In
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@RequestParam String email, @RequestParam String password) {
        // Check if the email is registered
        if (!userService.isEmailTaken(email)) {
            // If email is not registered, return 404 Not Found with a message
            AuthResponse authResponse = new AuthResponse(null, "Email not registered", false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(authResponse);
        }

        // Authenticate the user
        boolean authenticated = userService.signIn(email, password);
        if (authenticated) {
            // Successfully signed in, generate a token
            String token = JwtTokenUtil.generateToken(newUser.getEmail());  // Assuming generateJwtToken handles token creation
            AuthResponse authResponse = new AuthResponse(token, "Sign-in successful", true);
            return ResponseEntity.ok(authResponse);  // Return AuthResponse with token
        } else {
            // Invalid password
            AuthResponse authResponse = new AuthResponse(null, "Invalid password", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse);  // Return error message in AuthResponse
        }
    }
}
