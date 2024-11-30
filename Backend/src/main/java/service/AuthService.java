package service;

import utils.JwtUtil;

public class AuthService {
    private JwtUtil jwtUtil = new JwtUtil();

    public String login(String username, String password) {

        if (authenticate(username, password)) {
            return jwtUtil.generateToken(username); // Generate token on successful login
        }
        return null; // Invalid credentials
    }

    private boolean authenticate(String username, String password) {
        // Implement your user authentication logic (e.g., check password in database)
        return true; // Placeholder for real authentication logic
    }
}
