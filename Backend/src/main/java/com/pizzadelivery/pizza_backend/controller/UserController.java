package com.pizzadelivery.pizza_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pizzadelivery.pizza_backend.model.User;
import com.pizzadelivery.pizza_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // Using File.separator for platform independence
    private final String userImageFolder = System.getProperty("user.dir") + "/src/main/resources/uploads/User profile pictures";

    // Get user by username
    @GetMapping("/getuser/{userName}")
    public ResponseEntity<User> getUserByUserName(@PathVariable String userName) {
        try {
            User user = userService.getUserByUserName(userName)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // User not found
        }
    }

    // Get user profile image
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(userImageFolder).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream"; // Default to binary stream
                }
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build(); // Image not found
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); // Internal server error
        }
    }

    // Update user information
    @PutMapping("/update/{userName}")
    public ResponseEntity<User> updateUser(@PathVariable String userName,
                                           @RequestParam(value = "updatedUser") String updatedUserJson,
                                           @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            // Parse the updatedUser JSON string into a User object
            ObjectMapper objectMapper = new ObjectMapper();
            User updatedUser = objectMapper.readValue(updatedUserJson, User.class);

            User updated = userService.updateUser(userName, updatedUser, image);
            return ResponseEntity.ok(updated); // Return updated user
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // User not found
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); // Internal server error
        }
    }


    // Delete user by username
    @DeleteMapping("/{userName}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userName) {
        try {
            userService.deleteUser(userName);
            return ResponseEntity.noContent().build(); // No content if deletion is successful
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // User not found
        }
    }
}
