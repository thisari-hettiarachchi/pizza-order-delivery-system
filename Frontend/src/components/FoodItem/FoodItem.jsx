import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart } = useContext(StoreContext);
  const [localCount, setLocalCount] = useState(0);

  const handleBuy = () => {
    if (localCount > 0) {
      addToCart(id, localCount);
      setLocalCount(0); 
    }
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />

        {!localCount ? (
          <img
            className="add"
            onClick={() => setLocalCount((prev) => prev + 1)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => setLocalCount((prev) => prev - 1)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{localCount}</p>
            <img
              onClick={() => setLocalCount((prev) => prev + 1)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>

        <p className="food-item-desc">{description}</p>

        <div className="food-item-footer">
          <p className="food-item-price">Rs.{price}</p>
          <div className="add-to-cart">
            <button onClick={handleBuy} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
