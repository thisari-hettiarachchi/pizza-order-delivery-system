import React, { useContext, useState } from "react";
import "./FoodItemPopup.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodItemPopup = ({
  setShowItem,
  id,
  image,
  name,
  description,
  price,
}) => {
  const { addToCart, url } = useContext(StoreContext);
  const [localCount, setLocalCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const selectedPrice = price[selectedSize];

  const handleBuy = () => {
    if (localCount > 0 && selectedSize) {
      addToCart(id, selectedSize, localCount);
      setLocalCount(0);
      setSelectedSize("");
      toast.success(name+" add to cart successfully")// Reset size after adding to cart
    } else if (localCount === 0 && selectedSize === "") {
      toast.error("Please select a size and quantity before adding to cart");
    } else if (localCount === 0) {
      toast.error("Please select a quantity before adding to cart");
    } else {
      toast.error("Please select a size before adding to cart");
    }
  };
  return (
    <div className="food_item_container">
      <img
        src={url + "/api/food/image/" + image}
        alt={name}
        className="food_item_image"
      />
      <div className="food_item_details">
        <h1>{name}</h1>
        {selectedSize ? (
          <h4 className="price">
            Rs.{" "}
            {selectedPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h4>
        ) : (
          <h4 className="price">
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
          </h4>
        )}
        <hr />
        <p>{description}</p>
        <hr />
        <div className="size_selector">
          <label htmlFor="size">Size:</label>
          <select
            id="size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Choose an option</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="food_item_counter_container">
          <div className="quantity-conatiner">
            <span className="quantity">Select quantity</span>
          </div>

          <div className="food_item_counter">
            <img
              onClick={() => setLocalCount((prev) => (prev > 0 ? prev - 1 : 0))}
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
          <button
            src={image}
            targetTop={"5%"}
            targetLeft={"75%"}
            animationDuration={"1.5"}
          >
            <div
              onClick={() => {
                handleBuy();
              }}
            >
              Add to Cart
            </div>
          </button>
        </div>
      </div>
      <i class="bi bi-x close_icon" onClick={() => setShowItem(false)} />
    </div>
  );
};

export default FoodItemPopup;
