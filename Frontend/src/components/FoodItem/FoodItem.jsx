import React, { useState } from "react";
import { assets } from "../../assets/assets";
import FoodItemPopup from "../FoodItemPopup/FoodItemPopup";
import "./FoodItem.css";

const FoodItem = ({ id, name, price, description, image }) => {
  const [showItem, setShowItem] = useState(false);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={image}
          alt=""
          onClick={() => setShowItem(true)}
        />
        <i
          class="bi bi-search search-icon"
          onClick={() => setShowItem(true)}
        ></i>
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <div className="foof-item-name-container">
            <span className="food-item-name">{name}</span>
          </div>
          <img src={assets.rating_starts} alt="" />
        </div>

        <div className="food-item-desc-container">
          <p className="food-item-desc">{description}</p>
        </div>

        <div className="food-item-footer">
          <div className="food-item-price-container">
            <span className="food-item-price">
              Rs.{" "}
              {price.small.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              - Rs.{" "}
              {price.large.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="add-to-cart">
            <button onClick={() => setShowItem(true)}>Add to Cart</button>
          </div>
        </div>
      </div>
      {showItem && (
        <FoodItemPopup
          setShowItem={setShowItem}
          id={id}
          image={image}
          name={name}
          description={description}
          price={price}
        />
      )}
    </div>
  );
};

export default FoodItem;
