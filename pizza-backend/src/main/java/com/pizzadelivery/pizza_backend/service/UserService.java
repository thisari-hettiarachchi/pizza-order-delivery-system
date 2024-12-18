package com.pizzadelivery.pizza_backend.service;

import com.pizzadelivery.pizza_backend.model.User;
import com.pizzadelivery.pizza_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Check if email is already taken
    public boolean isEmailTaken(String email) {
        return userRepository.findByEmail(email) != null; // Returns true if email exists
    }

    // Sign Up
    public User signUp(User user) {
        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Sign In
    public boolean signIn(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return false;
        }
        return passwordEncoder.matches(password, user.getPassword());
    }
}