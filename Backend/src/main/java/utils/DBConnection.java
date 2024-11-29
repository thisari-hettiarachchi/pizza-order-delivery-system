// Encapsulation

package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/pizza_delivery";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "pizza123";

    public static Connection getConnection() {
        Connection connection = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            System.out.println("Database connection successful!");


        } catch (ClassNotFoundException e) {
            System.out.println("MySQL JDBC Driver not found.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection failed! Check output console.");
            e.printStackTrace();
        }
        return connection;
    }

    public static void main(String[] args) {

        Connection conn = getConnection();

        if (conn != null) {
            System.out.println("Connected to the database.");
        } else {
            System.out.println("Failed to connect to the database.");
        }
    }
}


