import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BiCamera } from "react-icons/bi";
import { toast } from "react-toastify";
import "./FoodUpdatePopup.css";

const FoodUpdatePopup = ({ food, closePopup, url }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedFood, setUpdatedFood] = useState(food);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    food?.image ? `${url}/api/food/image/${food.image}` : "/src/assets/user.png"
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUpdatedFood(food);
    setPreviewImage(
      food?.image
        ? `${url}/api/food/image/${food.image}`
        : "/src/assets/user.png"
    );
  }, [food, url]);

  const handleCancel = () => {
    setSelectedImage(null);
    setPreviewImage(
      food?.image
        ? `${url}/api/food/image/${food.image}`
        : "/src/assets/user.png"
    );
    closePopup();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("price")) {
      setUpdatedFood((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [name.replace("price", "").toLowerCase()]: value,
        },
      }));
    } else {
      setUpdatedFood((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (validImageTypes.includes(file.type)) {
        setSelectedImage(file);
        setPreviewImage(URL.createObjectURL(file));
        toast.success("Image selected successfully");
      } else {
        toast.error("Please select a valid image file (JPEG/PNG/JPG).");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append("name", updatedFood.name);
      formData.append("category", updatedFood.category);
      formData.append("priceSmall", updatedFood.price.small);
      formData.append("priceMedium", updatedFood.price.medium);
      formData.append("priceLarge", updatedFood.price.large);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.put(
        `${url}/api/food/update/${updatedFood.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
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
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form className="food-update-popup" onSubmit={handleSubmit}>
      <div className="popup-content">
        <p className="popup-title">Update Food Item</p>
        <div className="image-container">
          <img src={previewImage} alt="Food" className="food-img" />
          <label className="camera-icon">
            <BiCamera />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div className="input-group">
          <input
            className="input-field"
            type="text"
            name="name"
            value={updatedFood.name}
            placeholder="Food Name"
            onChange={handleChange}
          />
          <textarea
            className="input-field"
            name="description"
            value={updatedFood.description}
            placeholder="Description"
            onChange={handleChange}
          />
        </div>

        <div className="price-inputs">
          <input
            onChange={handleChange}
            value={updatedFood.price.small}
            type="number"
            name="priceSmall"
            placeholder="Small price"
            required
          />
          <input
            onChange={handleChange}
            value={updatedFood.price.medium}
            type="number"
            name="priceMedium"
            placeholder="Medium price"
            required
          />
          <input
            onChange={handleChange}
            value={updatedFood.price.large}
            type="number"
            name="priceLarge"
            placeholder="Large price"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="update-button" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default FoodUpdatePopup;
