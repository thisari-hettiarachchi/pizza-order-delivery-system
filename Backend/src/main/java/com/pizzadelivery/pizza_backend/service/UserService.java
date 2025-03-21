package com.pizzadelivery.pizza_backend.service;

import com.pizzadelivery.pizza_backend.model.User;
import com.pizzadelivery.pizza_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public User updateUser(String userName, User updatedUser) {
        return userRepository.findByUserName(userName).map(user -> {
            // Update the fields only if they are not null
            if (updatedUser.getFirstName() != null) user.setFirstName(updatedUser.getFirstName());
            if (updatedUser.getLastName() != null) user.setLastName(updatedUser.getLastName());
            if (updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
            if (updatedUser.getPassword() != null) user.setPassword(updatedUser.getPassword());
            if (updatedUser.getAddress() != null) {
                // Update the entire address object
                user.setAddress(updatedUser.getAddress());
            }
            if (updatedUser.getContactNumber() != null) user.setContactNumber(updatedUser.getContactNumber());
            if (updatedUser.getProfilePicture() != null) user.setProfilePicture(updatedUser.getProfilePicture());

            // Save the updated user data to the repository
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
