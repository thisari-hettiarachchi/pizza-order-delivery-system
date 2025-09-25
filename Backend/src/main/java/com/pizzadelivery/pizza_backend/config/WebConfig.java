package com.pizzadelivery.pizza_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${ALLOWED_ORIGINS:http://localhost:5173,http://localhost:5174}")
    private String allowedOriginsCsv;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = allowedOriginsCsv.split(",");
        registry.addMapping("/api/**") // Enable for all /api endpoints
                .allowedOrigins(origins) // Configurable frontend origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed methods
                .allowedHeaders("*"); // Allow all headers
    }
}
