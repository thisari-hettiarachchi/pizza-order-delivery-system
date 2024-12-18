package servlet;

import io.jsonwebtoken.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // Clear the authToken cookie
        Cookie cookie = new Cookie("authToken", "");
        cookie.setMaxAge(0); // Expire the cookie immediately
        cookie.setPath("/"); // Ensure it matches the path of the original cookie
        resp.addCookie(cookie);

        resp.setStatus(HttpServletResponse.SC_OK);
    }
}
