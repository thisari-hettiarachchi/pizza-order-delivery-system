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
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setAddress(updatedUser.getAddress());  // Update address fields if necessary
            user.setContactNumber(updatedUser.getContactNumber());
            user.setProfilePicture(updatedUser.getProfilePicture());  // Update profile picture
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
