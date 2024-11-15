import React, { useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useCart } from "../../Context/CartContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const [itemCount, setItemCount] = useState(0);
  const { addItem, removeItem } = useCart();
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

          {!itemCount ? (
            <img
              className="add"
              onClick={() => {
                setItemCount((prev) => prev + 1);
                addItem(price);
              }}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="food-item-checkout">
              <div className="food-item-counter">
                <img
                  onClick={() => {
                    setItemCount((prev) => prev - 1);
                    removeItem(price);
                  }}
                  src={assets.remove_icon_red}
                  alt=""
                />
                <p>{itemCount}</p>
                <img
                  onClick={() => {
                    setItemCount((prev) => prev + 1);
                    addItem(price);
                  }}
                  src={assets.add_icon_green}
                  alt=""
                />
              </div>

              <div className="buy">
                <button className="buy-button">Buy</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
