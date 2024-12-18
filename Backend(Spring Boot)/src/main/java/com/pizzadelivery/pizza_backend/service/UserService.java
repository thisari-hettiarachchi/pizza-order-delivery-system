package com.pizzadelivery.pizza_backend.service;

import com.pizzadelivery.pizza_backend.model.User;
import com.pizzadelivery.pizza_backend.model.AuthResponse;
import com.pizzadelivery.pizza_backend.repository.UserRepository;
import com.pizzadelivery.pizza_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // User Registration
    public AuthResponse userRegister(User user) {
        // Check if the email already exists
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return new AuthResponse(null, "Email already exists", false);
        }

        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // Return a successful response
        return new AuthResponse(null, "Registration successful", true);
    }

    // User Login
    public AuthResponse userLogin(String email, String password) {
        // Find the user by email
        Optional<User> user = userRepository.findByEmail(email);

        // Check if the user exists and the password matches
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            // Generate JWT token using email
            String token = jwtUtil.generateToken(user.get().getEmail());

            // Return a successful login response with the token
            return new AuthResponse(token, "Login successful", true);
        }

        // Return an error response if login fails
        return new AuthResponse(null, "Invalid email or password", false);
    }
}
