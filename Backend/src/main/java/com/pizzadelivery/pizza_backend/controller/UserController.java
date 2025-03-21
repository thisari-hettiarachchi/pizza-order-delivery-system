package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final com.pizzadelivery.pizza_backend.service.UserService userService;

    public UserController(com.pizzadelivery.pizza_backend.service.UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getuserbyname/{userName}")
    public ResponseEntity<User> getUserByUserName(@PathVariable String userName) {
        Optional<User> user = userService.getUserByUserName(userName);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getuserbyemail/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByUserName(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @PutMapping("/update/{userName}")
    public ResponseEntity<User> updateUser(@PathVariable String userName, @RequestBody User updatedUser) {
        try {
            User user = userService.updateUser(userName, updatedUser);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userName}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userName) {
        try {
            userService.deleteUser(userName);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
