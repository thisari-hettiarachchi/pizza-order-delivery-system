package servlet;

import utils.DBConnection;
import utils.JwtUtil;
import service.AuthService;
import com.google.gson.*;
import org.mindrot.jbcrypt.BCrypt;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

@WebServlet("/signin")
public class SignInServlet extends HttpServlet {

    private final AuthService authService = new AuthService(); // Service layer
    private final JwtUtil jwtUtil = new JwtUtil();             // JWT utility

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        JsonObject responseJson = new JsonObject();

        // Parse incoming JSON data
        JsonObject jsonData;
        try (BufferedReader reader = req.getReader()) {
            jsonData = JsonParser.parseReader(reader).getAsJsonObject();
        } catch (JsonParseException e) {
            responseJson.addProperty("error", "Invalid JSON format.");
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().println(responseJson.toString());
            return;
        }

        // Extract credentials
        String email = jsonData.has("email") ? jsonData.get("email").getAsString() : null;
        String password = jsonData.has("password") ? jsonData.get("password").getAsString() : null;

        if (email == null || password == null) {
            responseJson.addProperty("error", "Missing email or password.");
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().println(responseJson.toString());
            return;
        }

        try (Connection connection = DBConnection.getConnection()) {
            String sql = "SELECT user_name, password FROM users WHERE email = ?";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, email);
                ResultSet resultSet = statement.executeQuery();

                if (resultSet.next()) {
                    String storedPassword = resultSet.getString("password");
                    String userName = resultSet.getString("user_name");

                    // Verify password
                    if (BCrypt.checkpw(password, storedPassword)) {
                        // Generate JWT token
                        String token = jwtUtil.generateToken(email);

                        // Set JWT token in HTTP-Only cookie
                        Cookie cookie = new Cookie("authToken", token);
                        cookie.setHttpOnly(true);  // Prevent JavaScript access
                        cookie.setSecure(true);    // Only send over HTTPS
                        cookie.setMaxAge(60 * 60 * 24); // 1-day expiration
                        cookie.setPath("/"); // Available across the entire site
                        resp.addCookie(cookie);

                        // Successful response
                        responseJson.addProperty("message", "Sign-in successful!");
                        responseJson.addProperty("userName", userName);
                        resp.setStatus(HttpServletResponse.SC_OK);
                    } else {
                        responseJson.addProperty("error", "Invalid password.");
                        resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    }
                } else {
                    responseJson.addProperty("error", "User not found.");
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                }
            } catch (SQLException e) {
                responseJson.addProperty("error", "Database query error: " + e.getMessage());
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        } catch (SQLException e) {
            responseJson.addProperty("error", "Database connection error: " + e.getMessage());
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

        // Send JSON response
        try (PrintWriter out = resp.getWriter()) {
            out.println(responseJson.toString());
        }
    }
}
