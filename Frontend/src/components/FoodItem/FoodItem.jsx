import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import FoodItemPopup from "../FoodItemPopup/FoodItemPopup";
import "./FoodItem.css";
import { StoreContext } from "../../Context/StoreContext";
import { motion } from "framer-motion";

const FoodItem = ({ id, name, price, description, image }) => {
  const [showItem, setShowItem] = useState(false);
  const { url } = useContext(StoreContext);

  return (
    <motion.div
      className="food-item"
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }} 
      viewport={{ once: false, amount: 0.3 }} 
    >
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/api/food/image/" + image}
          alt=""
          onClick={() => setShowItem(true)}
        />
        <i
          className="bi bi-search search-icon"
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
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowItem(true)}
            >
              Add to Cart
            </motion.button>
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
    </motion.div>
  );
};

export default FoodItem;
