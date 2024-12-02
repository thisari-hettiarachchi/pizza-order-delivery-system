import React, { useContext, useState } from "react";
import "./FoodItemPopup.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import FlyingButton from "react-flying-item";

const FoodItemPopup = ({
  setShowItem,
  id,
  image,
  name,
  description,
  price,
}) => {
  const { addToCart } = useContext(StoreContext);
  const [localCount, setLocalCount] = useState(0);

  const handleBuy = () => {
    if (localCount > 0) {
      addToCart(id, localCount);
      setLocalCount(0);
    }
  };
  return (
    <div className="food_item_container">
      <img src={image} alt={name} className="food_item_image" />
      <div className="food_item_details">
        <h1>{name}</h1>
        <h4 className="price">Rs.{price}</h4>
        <hr />
        <p>{description}</p>
        <hr />
        <div className="size_selector">
          <label htmlFor="size">Size:</label>
          <select id="size">
            <option value="">Choose an option</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="food_item_counter_container">
          <span className="quantity">Select quantity</span>
          <div className="food_item_counter">
            <img
              onClick={() => setLocalCount((prev) => prev - 1)}
              src={assets.remove_icon_red}
              alt=""
            />
            <span>{localCount}</span>
            <img
              onClick={() => setLocalCount((prev) => prev + 1)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        </div>
        <div className="add_to_cart">
          <FlyingButton
            src={image}
            targetTop={"5%"}
            targetLeft={"70%"}
            animationDuration={"1.5"}
          >
            <div
              onClick={() => {
                handleBuy();
              }}
            >
              Add to Cart
            </div>
          </FlyingButton>
        </div>
      </div>
      <i class="bi bi-x close_icon" onClick={() => setShowItem(false)} />
    </div>
  );
};

export default FoodItemPopup;
