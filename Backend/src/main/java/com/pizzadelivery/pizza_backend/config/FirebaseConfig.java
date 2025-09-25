package com.pizzadelivery.pizza_backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

@Configuration
public class FirebaseConfig {

    @Value("${FIREBASE_CONFIG_JSON:}")
    private String firebaseConfigJson;

    @Value("${FIREBASE_CONFIG_PATH:}")
    private String firebaseConfigPath;

    @PostConstruct
    public void initialize() {
        try {
            InputStream serviceAccount;

            // Priority 1: Load from FIREBASE_CONFIG_JSON env/property (raw JSON)
            if (firebaseConfigJson != null && !firebaseConfigJson.isBlank()) {
                serviceAccount = new ByteArrayInputStream(firebaseConfigJson.getBytes(StandardCharsets.UTF_8));
            }
            // Priority 2: Load from FIREBASE_CONFIG_PATH env/property (file path)
            else if (firebaseConfigPath != null && !firebaseConfigPath.isBlank() && Files.exists(Path.of(firebaseConfigPath))) {
                serviceAccount = Files.newInputStream(Path.of(firebaseConfigPath));
            }
            // Fallback: Load service account key from classpath
            else {
                serviceAccount = new ClassPathResource("/firebase/firebase-config.json").getInputStream();
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize Firebase", e);
        }
    }
}