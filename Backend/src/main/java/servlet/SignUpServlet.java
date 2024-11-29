package servlet;

import utils.DBConnection;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import com.google.gson.*;
import org.mindrot.jbcrypt.BCrypt;

@WebServlet("/signup")
public class SignUpServlet extends HttpServlet {

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

        // Get the user data from the JSON
        String userName = jsonData.has("userName") ? jsonData.get("userName").getAsString() : null;
        String email = jsonData.has("email") ? jsonData.get("email").getAsString() : null;
        String password = jsonData.has("password") ? jsonData.get("password").getAsString() : null;

        // Validate the required fields
        if (userName == null || email == null || password == null) {
            responseJson.addProperty("error", "Missing required fields.");
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().println(responseJson.toString());
            return;
        }

        // Connect to the database and insert the user data
        try (Connection connection = DBConnection.getConnection()) {
            String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

            String sql = "INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, userName);
                statement.setString(2, email);
                statement.setString(3, hashedPassword);

                int rowsInserted = statement.executeUpdate();

                if (rowsInserted > 0) {
                    responseJson.addProperty("message", "Registration successful!");
                    resp.setStatus(HttpServletResponse.SC_OK);
                } else {
                    responseJson.addProperty("message", "Failed to register user.");
                    resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                }
            } catch (SQLException e) {
                responseJson.addProperty("error", "Error inserting data: " + e.getMessage());
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        } catch (SQLException e) {
            responseJson.addProperty("error", "Database error: " + e.getMessage());
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

        // Send JSON response back to the client
        PrintWriter out = resp.getWriter();
        out.println(responseJson.toString());
    }
}

