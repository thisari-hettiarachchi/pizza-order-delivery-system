import React from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin, formType, setFormType }) => {
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = {
      userName: e.target.userName?.value || "", // For Sign Up, name field will be present
      email: e.target.email.value,
      password: e.target.password.value,
    };

    // Log the form data to check what is being sent to the backend
    console.log("Form Data:", formData);

    // Determine the endpoint based on the formType (SignUp or Login)
    const endpoint = formType === "Sign Up" ? "signup" : "signin";

    try {
      const response = await fetch(`http://localhost:8080/Backend/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Log the server response to check the backend response
      console.log("Response from servlet:", data);

      if (response.ok) {
        // Handle successful response
        console.log(`${formType} successful`);
        setShowLogin(false); // Close the popup after successful sign up/sign in
      } else {
        // Handle error response
        alert(data.error || "An error occurred");
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
          <p>By Continuing, i agree to the terms of use & privacy policy</p>
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
