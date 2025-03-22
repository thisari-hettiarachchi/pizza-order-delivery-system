import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./FoodUpdatePopup.css";

const FoodUpdatePopup = ({ food, closePopup, url }) => {
  const [updatedFood, setUpdatedFood] = useState(food);

  useEffect(() => {
    setUpdatedFood(food); // When the food prop changes, update the local state
  }, [food]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `/api/food/updatefood/${updatedFood.id}`,
        updatedFood
      );

      if (response.status === 200) {
        toast.success("Food item updated successfully");
        closePopup();
      } else {
        toast.error("Failed to update food item");
      }
    } catch (error) {
      toast.error("Error updating food item");
      console.error("Error:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Edit Food Item</h3>
        <i className="bi bi-x close_icon" onClick={closePopup} />
        <div className="popup-content-details">
          <img
            src={`${url}/api/food/image/${updatedFood.image}`}
            alt={updatedFood.name}
          />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={updatedFood.name}
            onChange={handleChange}
          />
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={updatedFood.category}
            onChange={handleChange}
          />
          <label>Price (Small):</label>
          <input
            type="number"
            name="priceSmall"
            value={updatedFood.price.small}
            onChange={handleChange}
          />
          <label>Price (Medium):</label>
          <input
            type="number"
            name="priceMedium"
            value={updatedFood.price.medium}
            onChange={handleChange}
          />
          <label>Price (Large):</label>
          <input
            type="number"
            name="priceLarge"
            value={updatedFood.price.large}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={closePopup}>Cancel</button>
      </div>
    </div>
  );
};

export default FoodUpdatePopup;
