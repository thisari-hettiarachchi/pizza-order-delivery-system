package service;

import model.User;
import utils.DBConnection;

import java.sql.*;

public class UserRegistrationService extends UserService {

    @Override
    public boolean registerUser(User user) {
        try (Connection conn = DBConnection.getConnection()) {
            String query = "INSERT INTO users(username, password) VALUES (?,?)";
            try (PreparedStatement stmt = conn.prepareStatement(query)) {
                stmt.setString(1, user.getUsername());
                stmt.setString(2, user.getPassword());
                int rowsAffected = stmt.executeUpdate();
                return rowsAffected > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;

        }
    }

    @Override
    public User validateUser(String username, String password) {
        return null;
    }
}

