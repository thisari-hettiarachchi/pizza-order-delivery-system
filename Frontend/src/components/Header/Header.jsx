import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite pizza here</h2>
        <p>
          Indulge in the perfect slice, fresh from the oven! Crafted with
          authentic ingredients and baked to perfection, our pizzas are sure to
          satisfy your cravings. Order now and experience the warmth and flavor
          of your favorite pizza, just a click away!
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
