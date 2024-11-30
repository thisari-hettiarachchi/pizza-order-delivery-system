import React from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin, formType, setFormType }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userName: e.target.userName?.value || "",
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log("Form Data:", formData);

    const endpoint = formType === "Sign Up" ? "signup" : "signin";

    try {
      const response = await fetch(
        `http://localhost:8080/Backend/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Response from servlet:", data);

      if (response.ok) {
        // Store the token in localStorage after a successful login/signup
        console.log(formType + " successful!");
        localStorage.setItem("token", data.token); // Store token

        // Optionally, store user name or other info
        const userName = data.userName;
        console.log("User Name:", userName);

        // After successful login, close the login popup
        setShowLogin(false);
        alert(formType + " Successful");

        // Access protected endpoint with the token
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const protectedResponse = await fetch("/some-protected-endpoint", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              },
            });

            const protectedData = await protectedResponse.json();
            console.log("Protected data:", protectedData);
          } catch (error) {
            console.error("Error accessing protected data:", error);
          }
        }
      } else {
        console.log("Error:", data.error);
        alert("Login failed. " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the server.");
    }
  };

  return (
    <div className="login-popup">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>{formType}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {formType === "Sign Up" && (
            <input
              type="text"
              name="userName"
              placeholder="Your name"
              required
            />
          )}

          <input type="email" name="email" placeholder="Your email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">
          {formType === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {formType === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setFormType("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setFormType("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
