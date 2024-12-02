import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [formType, setFormType] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
  });

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
      <ToastContainer
        stacked
        transition={bounce}
        limit={3}
        style={{
          width: "300px",
          height: "50px",
          fontSize: "16px",
        }}
      />
    </>
  );
};

export default App;
