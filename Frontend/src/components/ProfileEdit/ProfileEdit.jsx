import React, { useState, useEffect } from "react";
import { BiCamera } from "react-icons/bi";
import "./ProfileEdit.css";
import { toast } from "react-toastify";

export const ProfileEdit = ({ user, setUser, setIsEditing }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    street: user.street || "",
    city: user.city || "",
    state: user.state || "",
    zip: user.zipCode || "",
    country: user.country || "",
    phone: user.phone || "",
    image: user.image || null,  // Adding the existing image if available
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      street: user.street || "",
      city: user.city || "",
      state: user.state || "",
      zip: user.zipCode || "",
      country: user.country || "",
      phone: user.phone || "",
      image: user.image || null,  // Ensure the initial image state is updated
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const newImage = e.target.files[0];
      setFormData({ ...formData, image: newImage });
      toast.success("Profile image selected successfully");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const { firstName, lastName, street, city, state, zip, country, phone, image } = formData;

    // Check if all required fields are filled
    if (!firstName || !lastName || !street || !city || !state || !zip || !country || !phone) {
      toast.error("Please fill in all fields");
      setIsUpdating(false);
      return;
    }

    // Ensure an image is selected
    if (!image) {
      toast.error("Please select a profile image");
      setIsUpdating(false);
      return;
    }

    // Update the user profile
    setUser({ ...user, ...formData });
    toast.success("Profile updated successfully");
    setIsUpdating(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    toast.info("Changes canceled");
    setIsEditing(false);
  };

  return (
    <form className="myaccount" onSubmit={handleSubmit}>
      <div className="myaccount-left">
        <p className="myaccount-title">My Profile</p>
        <div className="profile-img-container">
          <img 
            src={formData.image ? URL.createObjectURL(formData.image) : "/src/assets/user.png"} 
            alt="User Profile" 
            className="profile-img" 
          />
          <label className="camera-icon">
            <BiCamera />
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: "none" }} 
              onChange={handleImageChange} 
            />
          </label>
        </div>
        <div className="myaccount-mutli-fields">
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            placeholder="First Name" 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            placeholder="Last Name" 
            onChange={handleChange} 
          />
        </div>
        <input 
          type="text" 
          name="street" 
          value={formData.street} 
          placeholder="Street" 
          onChange={handleChange} 
        />
        <div className="myaccount-mutli-fields">
          <input 
            type="text" 
            name="city" 
            value={formData.city} 
            placeholder="City" 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="state" 
            value={formData.state} 
            placeholder="State" 
            onChange={handleChange} 
          />
        </div>
        <div className="myaccount-mutli-fields">
          <input 
            type="text" 
            name="zip" 
            value={formData.zip} 
            placeholder="Zip code" 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="country" 
            value={formData.country} 
            placeholder="Country" 
            onChange={handleChange} 
          />
        </div>
        <input 
          type="text" 
          name="phone" 
          value={formData.phone} 
          placeholder="Phone" 
          onChange={handleChange} 
        />
        <div className="myaccount-button">
          <button 
            type="submit" 
            className="myaccount-upbutton" 
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
          <button 
            type="button" 
            className="myaccount-cancelbutton" 
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileEdit;
