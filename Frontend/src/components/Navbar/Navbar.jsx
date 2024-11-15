import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useCart } from "../../Context/CartContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { itemCount, totalPrice } = useCart();

  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />

      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </li>
        <li
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-app
        </li>
        <li
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact-us
        </li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="navbar-search-icon">
          <img src={assets.shopping_bag} alt="" />
          {itemCount > 0 && <div className="dot"></div>}
          <span className="cart-count-price">
            {itemCount} items - Rs.{totalPrice.toFixed(2)}
          </span>
        </div>

        <button>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
