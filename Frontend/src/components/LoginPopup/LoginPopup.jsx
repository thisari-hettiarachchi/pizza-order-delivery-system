import React from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

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
        // Store the token and user name in localStorage after a successful login/signup
        localStorage.setItem("token", data.token); // Store token
        localStorage.setItem("userName", data.userName); // Store user name

        console.log(formType + " successful!");

        // Update login state in the parent component
        setIsLoggedIn(true);

        // After successful login, close the login popup
        setShowLogin(false);
        alert(formType + " Successful");
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
