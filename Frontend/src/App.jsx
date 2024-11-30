import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginPopup from "./components/LoginPopup/LoginPopup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [formType, setFormType] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Check login status on page load

  return (
    <>
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          setFormType={setFormType}
          formType={formType}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      <div className="app">
        <Navbar
          setShowLogin={setShowLogin}
          setFormType={setFormType}
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
