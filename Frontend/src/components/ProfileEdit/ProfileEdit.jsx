import React, { useState, useEffect, useContext } from "react";
import { BiCamera } from "react-icons/bi";
import "./ProfileEdit.css";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/StoreContext";
import ProfileContent from "../../components/ProfileContent/ProfileContent";

export const ProfileEdit = () => {
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const { userName } = useContext(StoreContext);

  const loggedInEmail = userName; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedUser = {
      email: loggedInEmail,
      firstName: user.firstName,
      lastName: user.lastName,
      street: user.street,
      city: user.city,
      state: user.state,
      country: user.country,
      zipCode: user.zipCode,
      phone: user.phone,
      profilePicture: selectedImage ? URL.createObjectURL(selectedImage) : user.profilePicture, // Include profile picture
    };

    try {
      const response = await fetch(`http://localhost:8080/api/users/update/${loggedInEmail}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Error updating profile");

      toast.success("Profile updated successfully!");
      setLoading(false);
      setTimeout(() => setIsEditing(false), 1500);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInEmail) {
      fetch(`http://localhost:8080/api/users/${loggedInEmail}`)
        .then((response) => {
          if (!response.ok) throw new Error("Error fetching user data");
          return response.json();
        })
        .then((data) => setUser(data))
        .catch(() => toast.error("Error fetching user data"));
    }
  }, [loggedInEmail]);

  const handleCancel = () => setIsEditing(false);

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
    }
  };

  const handleSaveImage = () => {
    if (!selectedImage) {
      toast.error("Please select an image first.");
      return;
    }
    toast.success("Image saved successfully!");
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    toast.success("Image deleted!");
  };

  return isEditing ? (
    <form className="myaccount" onSubmit={handleSubmit}>
      <div className="myaccount-left">
        <p className="myaccount-title">Edit Profile</p>
        <div className="myaccount-mutli-fields">
          <input type="text" name="firstName" value={user.firstName || ""} onChange={handleChange} placeholder="First Name" />
          <input type="text" name="lastName" value={user.lastName || ""} onChange={handleChange} placeholder="Last Name" />
        </div>
        <input type="text" name="street" value={user.street || ""} onChange={handleChange} placeholder="Street" />
        <div className="myaccount-mutli-fields">
          <input type="text" name="city" value={user.city || ""} onChange={handleChange} placeholder="City" />
          <input type="text" name="state" value={user.state || ""} onChange={handleChange} placeholder="State" />
        </div>
        <div className="myaccount-mutli-fields">
          <input type="text" name="zipCode" value={user.zipCode || ""} onChange={handleChange} placeholder="Zip code" />
          <input type="text" name="country" value={user.country || ""} onChange={handleChange} placeholder="Country" />
        </div>
        <input type="text" name="phone" value={user.phone || ""} onChange={handleChange} placeholder="Phone" />
        <div className="myaccount-button">
          <button type="submit" className="myaccount-upbutton" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
          <button type="button" className="myaccount-cancelbutton" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
      <div className="myaccount-right">
        <div className="profile-img-container">
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : user.profilePicture || "/default-user.png"}
            className="profile-img"
          />
          <label className="camera-icon">
            <BiCamera />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div className="profile-buttons">
          <button type="button" className="img-svbutton" onClick={handleSaveImage}>
            Save Image
          </button>
          <button type="button" className="img-dltbutton" onClick={handleDeleteImage}>
            Delete Image
          </button>
        </div>
      </div>
    </form>
  ) : (
    <ProfileContent />
  );
};

export default ProfileEdit;
