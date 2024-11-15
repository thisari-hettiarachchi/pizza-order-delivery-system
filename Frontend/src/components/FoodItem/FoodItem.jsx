import React, { useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useCart } from "../../Context/CartContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const [localcount, setLocalCount] = useState(0);
  const { addItem } = useCart();

  const handleBuy = () => {
    addItem(localcount, price);
    setLocalCount(0); // Reset the local count after adding to cart
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>

        <p className="food-item-desc">{description}</p>

        <div className="food-item-footer">
          <p className="food-item-price">Rs.{price}</p>

          {!localcount ? (
            <img
              className="add"
              onClick={() => {
                setLocalCount((prev) => prev + 1);
              }}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="food-item-checkout">
              <div className="food-item-counter">
                <img
                  onClick={() => {
                    localcount > 0 ? setLocalCount((prev) => prev - 1) : 0;
                  }}
                  src={assets.remove_icon_red}
                  alt=""
                />
                <p>{localcount}</p>
                <img
                  onClick={() => {
                    setLocalCount((prev) => prev + 1);
                  }}
                  src={assets.add_icon_green}
                  alt=""
                />
              </div>

              <div className="buy">
                <button
                  onClick={handleBuy}
                  disabled={localcount === 0}
                  className="buy-button"
                >
                  Buy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
