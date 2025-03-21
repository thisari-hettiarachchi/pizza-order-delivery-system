package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.model.User;
import com.pizzadelivery.pizza_backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;
    private static final String UPLOAD_DIR = "uploads/";

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/uploadProfilePicture/{userName}")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable String userName, @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            // Ensure upload directory exists
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Save file with original filename
            String filePath = UPLOAD_DIR + file.getOriginalFilename();
            File destFile = new File(filePath);
            file.transferTo(destFile);

            // Update user's profile picture path in database
            Optional<User> userOptional = userService.getUserByUserName(userName);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setProfilePicture(file.getOriginalFilename());
                userService.updateUser(userName, user);
                return ResponseEntity.ok(file.getOriginalFilename()); // Send the filename to frontend
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }

    @GetMapping("/getuserbyname/{userName}")
    public ResponseEntity<User> getUserByUserName(@PathVariable String userName) {
        Optional<User> user = userService.getUserByUserName(userName);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getuserbyemail/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email); // Fixed method reference
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
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
