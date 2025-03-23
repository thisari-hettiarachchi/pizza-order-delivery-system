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

  const cancelImageSelection = () => {
    setSelectedImage(null);
    setPreviewImage(
      food?.image
        ? `${url}/api/food/image/${food.image}`
        : "/src/assets/user.png"
    );
    fileInputRef.current.value = null;
    toast.info("Image selection canceled.");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setUpdatedFood((prevData) => ({
      ...prevData,
      [name]: ["small", "medium", "large"].includes(name)
        ? { ...prevData.price, [name]: value }
        : value, 
    }));
  };

  const handleImageChange = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (validImageTypes.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(file);
        setPreviewImage(imageUrl);
        toast.success("Image selected successfully");
      } else {
        toast.error("Please select a valid image file (JPEG/PNG/JPG).");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    if (!food.image && !selectedImage) {
      toast.error("Please upload an image.");
      setIsUpdating(false);
      return;
    }

    const foodJson = JSON.stringify({
      name: updatedFood.name,
      description: updatedFood.description,
      price: {
        small: Number(updatedFood.price.small),
        medium: Number(updatedFood.price.medium),
        large: Number(updatedFood.price.large),
      },
      category: updatedFood.category, 
    });

    console.log("Food JSON Payload:", foodJson); 

    const formData = new FormData();
    formData.append("food", foodJson);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.put(
        `${url}/api/food/updatefood/${updatedFood.id}`,
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

        <div className="input-group-inline">
          <input
            className="input-field"
            type="text"
            name="name"
            value={updatedFood.name}
            placeholder="Food Name"
            onChange={onChangeHandler}
          />
          
          <select
            onChange={onChangeHandler}
            name="category"
            value={updatedFood.category}
            required
          >
            <option value="Pizza">Pizza</option>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Desserts">Desserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Beverages">Beverages</option>
            <option value="Pasta">Pasta</option>
          </select>
        </div>

        <div className="input-group">
          <textarea
            className="input-field"
            name="description"
            value={updatedFood.description}
            placeholder="Description"
            onChange={onChangeHandler}
          />
        </div>

        <div className="price-inputs">
          <p>Small Price</p>
          <input
            onChange={onChangeHandler}
            value={updatedFood.price.small}
            type="number"
            name="small"
            placeholder="Small price"
            required
          />
        </div>
        <div className="price-inputs">
          <p>Medium Price</p>
          <input
            onChange={onChangeHandler}
            value={updatedFood.price.medium}
            type="number"
            name="medium"
            placeholder="Medium price"
            required
          />
        </div>
        <div className="price-inputs">
          <p>Large Price</p>
          <input
            onChange={onChangeHandler}
            value={updatedFood.price.large}
            type="number"
            name="large"
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