package com.pizzadelivery.pizza_backend.service;

import com.pizzadelivery.pizza_backend.model.User;
import com.pizzadelivery.pizza_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

// Service Class
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final String userImageFolder = Paths.get(System.getProperty("user.dir"), "src/main/resources/uploads/User profile pictures").toString();

    public Optional<User> getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    // Save image method with checks and exception handling
    private String saveImage(MultipartFile image) throws IOException {
        if (image.isEmpty()) {
            throw new IOException("File is empty");
        }

        Path uploadPath = Paths.get(userImageFolder);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }

    // Update user method with image handling
    public User updateUser(String userName, User updatedUser, MultipartFile image) throws IOException {
        Optional<User> userOptional = userRepository.findByUserName(userName);

        return userOptional.map(user -> {
            // Update fields
            if (updatedUser.getFirstName() != null) user.setFirstName(updatedUser.getFirstName());
            if (updatedUser.getLastName() != null) user.setLastName(updatedUser.getLastName());
            if (updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
            if (updatedUser.getPassword() != null) user.setPassword(updatedUser.getPassword());
            if (updatedUser.getAddress() != null) user.setAddress(updatedUser.getAddress());
            if (updatedUser.getContactNumber() != null) user.setContactNumber(updatedUser.getContactNumber());

            // Handle profile picture if new image is uploaded
            if (image != null && !image.isEmpty()) {
                try {
                    // Optionally delete old profile image here
                    String imageFileName = saveImage(image);
                    user.setProfilePicture(imageFileName); // Set new profile picture filename
                } catch (IOException e) {
                    throw new RuntimeException("Failed to save image for user: " + userName, e);
                }
            }

            // Save and return updated user
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with userName: " + userName));
    }

    public void deleteUser(String userName) {
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found with userName: " + userName);
        }
        userRepository.delete(user.get());
    }
}

