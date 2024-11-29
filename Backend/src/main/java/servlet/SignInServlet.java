package servlet;

import utils.DBConnection;
import com.google.gson.*;
import org.mindrot.jbcrypt.BCrypt;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

@WebServlet("/signin")
public class SignInServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");

        BufferedReader reader = req.getReader();
        JsonObject responseJson = new JsonObject();

        // Parse the incoming JSON data
        JsonObject jsonData;
        try {
            jsonData = JsonParser.parseReader(reader).getAsJsonObject();
        } catch (JsonParseException e) {
            responseJson.addProperty("error", "Invalid JSON format.");
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().println(responseJson.toString());
            return;
        }

        // Get the user credentials from the JSON
        String email = jsonData.has("email") ? jsonData.get("email").getAsString() : null;
        String password = jsonData.has("password") ? jsonData.get("password").getAsString() : null;

        // Validate the required fields
        if (email == null || password == null) {
            responseJson.addProperty("error", "Missing email or password.");
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().println(responseJson.toString());
            return;
        }

        // Connect to the database and validate the user credentials
        try (Connection connection = DBConnection.getConnection()) {
            String sql = "SELECT user_name, password FROM users WHERE email = ?";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, email);
                ResultSet resultSet = statement.executeQuery();

                // If user with the given email exists
                if (resultSet.next()) {
                    String storedPassword = resultSet.getString("password");
                    String userName = resultSet.getString("user_name");

                    // Verify the password using BCrypt
                    if (BCrypt.checkpw(password, storedPassword)) {
                        // Successful login, create a session
                        HttpSession session = req.getSession();
                        session.setAttribute("userEmail", email);
                        session.setAttribute("userName", userName);

                        responseJson.addProperty("message", "Sign-in successful!");
                        resp.setStatus(HttpServletResponse.SC_OK);
                    } else {
                        // Incorrect password
                        responseJson.addProperty("error", "Invalid password.");
                        resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    }
                } else {
                    // No user found with the given email
                    responseJson.addProperty("error", "User not found.");
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                }
            } catch (SQLException e) {
                responseJson.addProperty("error", "Error querying the database: " + e.getMessage());
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        } catch (SQLException e) {
            responseJson.addProperty("error", "Database error: " + e.getMessage());
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

        // Send the JSON response back to the client
        PrintWriter out = resp.getWriter();
        out.println(responseJson.toString());
    }
}
