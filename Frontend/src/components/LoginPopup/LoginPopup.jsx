import React, { useContext, useState } from "react";
import { auth } from "../../utils/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItems, formType, setFormType, setIsLoggedIn } =
    useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const userName = e.target.userName?.value || "";

    const auth = getAuth();

    try {
      let userCredential;
      if (formType === "Sign Up") {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Sign Up Successful. Please log in to continue.");
        setFormType("Login");
        setLoading(false);
        return;
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      const token = await userCredential.user.getIdToken();

      console.log("Firebase ID Token:", token);

      // Send token to backend to verify and fetch user data or cart
      const response = await fetch(`http://localhost:8080/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("Response from backend:", data);

      if (response.ok) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "userName",
          data.userName || userCredential.user.displayName || email
        );
        setIsLoggedIn(true);
        setShowLogin(false);
        fetchCartItems();
        toast.success("Login Successful!");
      } else {
        toast.error(`Login failed. ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Store token consistently
      localStorage.setItem("token", idToken);
      localStorage.setItem("userName", user.displayName || user.email);

      // Send token to backend to register/check user
      const response = await fetch(
        "http://localhost:8080/api/auth/registerOrLogin",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: user.displayName,
            email: user.email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setShowLogin(false);
        fetchCartItems();
        toast.success("Google Sign-in Successful!");
        console.log("Signed in with Google!", user);
      } else {
        toast.error(
          `Google sign-in failed. ${data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Google sign-in error", error);
      toast.error(error.message || "Google sign-in failed");
    } finally {
      setLoading(false);
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

        <button type="submit" disabled={loading} className="submit-button">
          {loading
            ? "Processing..."
            : formType === "Sign Up"
            ? "Create account"
            : "Login"}
        </button>

        <div className="google-signin-container">
          <div className="google-signin-divider">
            <hr />
            <p>or continue with</p>
            <hr />
          </div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="google-signin-button"
          >
            <div className="google-signin-content">
              <img src={assets.google} alt="Google" className="google-icon" />
              <span className="google-text">Google</span>
            </div>
          </button>
        </div>

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
