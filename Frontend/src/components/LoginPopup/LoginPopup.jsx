import React from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin, formType, setFormType, setIsLoggedIn }) => {
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
        if (formType === "Sign Up") {
          // Sign-up success
          toast.success("Sign Up Successful. Please log in to continue."); // Show toast for sign-up success
          setFormType("Login"); // Switch to login form
        } else if (formType === "Login") {
          // Login success
          localStorage.setItem("token", data.token); // Store token
          localStorage.setItem("userName", data.userName); // Store user name
          console.log("Login successful!");

          // Update login state in the parent component
          setIsLoggedIn(true);

          // Close the login popup
          setShowLogin(false);
          toast.success("Login Successful!"); // Show toast for login success
        }
      } else {
        console.log("Error:", data.error);
        toast.error(formType + " failed. " + data.error); // Show toast for failure
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error connecting to the server."); // Show toast for server error
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
            alt="Close"
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
