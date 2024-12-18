package com.pizzadelivery.pizza_backend.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {

    private String secretKey = "your-secret-key";  // Use a proper secret key

    // Method to generate JWT token
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)  // Set the subject (email or user identifier)
                .setIssuedAt(new Date())  // Set the issue date
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))  // Set expiration (1 hour for example)
                .signWith(SignatureAlgorithm.HS256, secretKey)  // Sign with the secret key
                .compact();
    }

    // Method to validate the token
    public boolean validateToken(String token, String email) {
        String tokenEmail = extractUsername(token);
        return (email.equals(tokenEmail) && !isTokenExpired(token));
    }

    // Method to extract username (email) from the token
    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Method to check if the token has expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Method to extract expiration date from the token
    private Date extractExpiration(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }
}
