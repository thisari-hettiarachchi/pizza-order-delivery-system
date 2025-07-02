package com.pizzadelivery.pizza_backend.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.pizzadelivery.pizza_backend.dto.response.AuthResponse;
import com.pizzadelivery.pizza_backend.model.User;
import com.pizzadelivery.pizza_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public AuthResponse verifyFirebaseToken(String idToken) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();

            Optional<User> optionalUser = userRepository.findByUid(uid);

            User user;
            if (optionalUser.isPresent()) {
                user = optionalUser.get();
            } else {
                // create user if not exist
                user = new User();
                user.setUid(uid);
                user.setEmail(email);
                user.setUserName(email.split("@")[0]); // example username
                userRepository.save(user);
            }

            return new AuthResponse(null, user.getUserName(), "Login successful", true);

        } catch (FirebaseAuthException e) {
            return new AuthResponse(null, null, "Invalid Firebase ID token", false);
        }
    }
}
