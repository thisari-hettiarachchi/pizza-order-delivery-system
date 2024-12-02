import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import FoodItemPopup from "../FoodItemPopup/FoodItemPopup";
import "./FoodItem.css";

const FoodItem = ({ id, name, price, description, image }) => {

  const [showItem, setShowItem] = useState(false);


  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
        <i
          class="bi bi-search search-icon"
          onClick={() => setShowItem(true)}
        ></i>
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
