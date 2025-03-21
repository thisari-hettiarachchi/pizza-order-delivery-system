import React, { useState, useEffect } from "react";
import { BiCamera } from "react-icons/bi";
import { toast } from "react-toastify";
import "./ProfileEdit.css";

export const ProfileEdit = ({ user, setUser, setIsEditing }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    address: {
      street: user.address?.street || "",
      city: user.address?.city || "",
      state: user.address?.state || "",
      zipCode: user.address?.zipCode || "",
      country: user.address?.country || "",
    },
    contactNumber: user.contactNumber || "",
    profilePicture: user.profilePicture || null,
  });

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      address: {
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zipCode: user.address?.zipCode || "",
        country: user.address?.country || "",
      },
      contactNumber: user.contactNumber || "",
      profilePicture: user.profilePicture || null,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const newImage = e.target.files[0];
      setFormData({ ...formData, profilePicture: newImage });
      toast.success("Profile image selected successfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.address.street ||
      !formData.address.city ||
      !formData.address.state ||
      !formData.address.zipCode ||
      !formData.address.country ||
      !formData.contactNumber
    ) {
      toast.error("Please fill in all fields");
      setIsUpdating(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/update/${user.userName}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form className="myaccount" onSubmit={handleSubmit}>
      <div className="myaccount-left">
        <p className="myaccount-title">My Profile</p>
        <div className="profile-img-container">
          <img
            src={
              formData.profilePicture
                ? URL.createObjectURL(formData.profilePicture)
                : "/src/assets/user.png"
            }
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
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          disabled
        />
        <div className="myaccount-mutli-fields">
          <input
            type="text"
            name="street"
            value={formData.address.street}
            placeholder="Street"
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            value={formData.address.city}
            placeholder="City"
            onChange={handleChange}
          />
        </div>
        <div className="myaccount-mutli-fields">
          <input
            type="text"
            name="state"
            value={formData.address.state}
            placeholder="State"
            onChange={handleChange}
          />
          <input
            type="text"
            name="zipCode"
            value={formData.address.zipCode}
            placeholder="Zip Code"
            onChange={handleChange}
          />
        </div>
        <div className="myaccount-mutli-fields">
          <input
            type="text"
            name="country"
            value={formData.address.country}
            placeholder="Country"
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
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
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileEdit;
