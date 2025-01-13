import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/StoreContext";

const LoginPopup = ({ setShowLogin, formType, setFormType, setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItems } = useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      userName: formType === "Sign Up" ? e.target.userName?.value || "" : null,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log("Form Data:", formData);

    const endpoint = formType === "Sign Up" ? "signup" : "signin";

    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Response from backend:", data);

      if (response.ok) {
        if (formType === "Sign Up") {
          toast.success("Sign Up Successful. Please log in to continue.");
          setFormType("Login");
        } else if (formType === "Login") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userName", data.userName);
          setIsLoggedIn(true);
          setShowLogin(false);
          fetchCartItems();
          toast.success("Login Successful!");
        }
      } else {
        console.log("Error:", data.message);
        toast.error(`${formType} failed. ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error connecting to the server.");
    } finally {
      setLoading(false); // Stop processing
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

        <button type="submit" disabled={loading}>
          {loading
            ? "Processing..."
            : formType === "Sign Up"
            ? "Create account"
            : "Login"}
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
