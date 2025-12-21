package com.pizzadelivery.pizza_backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    @Value("${FIREBASE_CONFIG_JSON:}")
    private String firebaseConfigJson;

    @PostConstruct
    public void initialize() {
        try {
            if (firebaseConfigJson == null || firebaseConfigJson.isBlank()) {
                System.err.println("Firebase configuration JSON is missing! Firebase will not be initialized.");
                return;
            }

            // FIX: Environment variables often escape the backslash in \n.
            // This replaces the literal string "\n" with a real newline character so the Private Key is valid.
            String sanitizedJson = firebaseConfigJson.replace("\\n", "\n");

            InputStream serviceAccount = new ByteArrayInputStream(sanitizedJson.getBytes(StandardCharsets.UTF_8));

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            // Only initialize if no apps exist to avoid "IllegalStateException: FirebaseApp name [DEFAULT] already exists"
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("Firebase has been successfully initialized from environment variable.");
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize Firebase with the provided JSON string", e);
        }
    }
}