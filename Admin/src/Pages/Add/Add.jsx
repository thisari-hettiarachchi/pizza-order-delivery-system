import React, { useState, useRef } from "react";
import "./Add.css";
import { BiCamera } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const url = "http://localhost:8080";

  const [data, setData] = useState({
    name: "",
    description: "",
    price: { small: "", medium: "", large: "" }, 
    category: "Pizza",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (["small", "medium", "large"].includes(name)) {
      setData((prevData) => ({
        ...prevData,
        price: { ...prevData.price, [name]: value }, 
      }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
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

  const cancelImageSelection = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    fileInputRef.current.value = null;
    toast.info("Image selection canceled.");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!selectedImage) {
      toast.error("Please upload an image.");
      return;
    }

    const foodJson = JSON.stringify({
      name: data.name,
      description: data.description,
      price: {
        small: Number(data.price.small),
        medium: Number(data.price.medium),
        large: Number(data.price.large),
      },
      category: data.category,
    });

    const formData = new FormData();
    formData.append("food", foodJson);
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(`${url}/api/food/addfood`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setData({
          name: "",
          description: "",
          price: { small: "", medium: "", large: "" },
          category: "Pizza",
        });
        setSelectedImage(null);
        setPreviewImage(null);
        fileInputRef.current.value = null;
        toast.success("Product added successfully!");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      toast.error("Error adding product. Please try again.");
    }
  };

  return (
    <div className="_add">
  <form className="flex-col" onSubmit={onSubmitHandler}>
    <div className="add_product_name_category flex-row">
      <div className="add_product_name flex-col">
        <p>Product name</p>
        <input
          onChange={onChangeHandler}
          value={data.name}
          type="text"
          name="name"
          placeholder="Type here"
          required
        />
      </div>
      <div className="add_category flex-col">
        <p>Product category</p>
        <select
          onChange={onChangeHandler}
          name="category"
          value={data.category}
        >
          <option value="Pizza">Pizza</option>
          <option value="Salad">Salad</option>
          <option value="Rolls">Rolls</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Cake">Cake</option>
          <option value="Pure">Pure</option>
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
        </select>
      </div>
    </div>

    <div className="add_product_description_price flex-row">
      <div className="add_product_description flex-col">
        <p>Product description</p>
        <textarea
          onChange={onChangeHandler}
          value={data.description}
          name="description"
          rows="10"
          placeholder="Write content here"
          required
        ></textarea>
      </div>
      <div className="add_price flex-col">
        <p>Product price</p>
        <div className="price-inputs">
          <input
            onChange={onChangeHandler}
            value={data.price.small}
            type="number"
            name="small"
            placeholder="Small price"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.price.medium}
            type="number"
            name="medium"
            placeholder="Medium price"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.price.large}
            type="number"
            name="large"
            placeholder="Large price"
            required
          />
        </div>
      </div>
    </div>

    <div className="add_img_upload flex-col">
      <p>Upload Image</p>
      <label className="camera-icon">
        Add image
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            handleImageChange();
            if (e.target.files[0]) {
              setSelectedImage(e.target.files[0]);
            }
          }}
        />
      </label>
      {previewImage && (
        <img src={previewImage} alt="Preview" className="preview-image" />
      )}
      {selectedImage && (
        <div className="image-preview-container">
          <p className="image-name">{selectedImage.name}</p>
          <button
            type="button"
            className="cancel-btn"
            onClick={cancelImageSelection}
          >
            Cancel
          </button>
        </div>
      )}
    </div>

    <button type="submit" className="add-btn">
      ➕ Add Product
    </button>
  </form>
</div>

  );
};

export default Add;
