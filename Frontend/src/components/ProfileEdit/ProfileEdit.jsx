import React, { useState, useEffect, useRef, useContext } from "react";
import { BiCamera } from "react-icons/bi";
import { toast } from "react-toastify";
import { StoreContext} from "../../Context/StoreContext";
import "./ProfileEdit.css";

export const ProfileEdit = ({ setIsEditing }) => {
  const { user, setUser, url } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
      country: user?.address?.country || "",
    },
    contactNumber: user?.contactNumber || "",
    profilePicture: user?.profilePicture || null,
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image file
  const [previewImage, setPreviewImage] = useState(null); // Track the preview image URL
  const fileInputRef = useRef(null);

  // Initialize form data and preview image when the user changes
  useEffect(() => {
    if (user) {
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
      setPreviewImage(user.profilePicture); // Set the preview image to the current profile picture
    }
  }, [user]);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle image selection
  const handleImageChange = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (validImageTypes.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file); // Generate a temporary preview URL
        setSelectedImage(file); // Store the selected image file
        setPreviewImage(imageUrl); // Update the preview image
        toast.success("Profile image selected successfully");
      } else {
        toast.error("Please select a valid image file (JPEG/PNG/JPG).");
      }
    }
  };

  // Handle form submission
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
      const formDataToSend = new FormData();
      const updatedUser = { ...formData };

      // Remove profilePicture from JSON since it's sent separately
      delete updatedUser.profilePicture;

      formDataToSend.append("updatedUser", JSON.stringify(updatedUser));

      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      const response = await fetch(
        `http://localhost:8080/api/users/update/${user.userName}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(`Failed to update profile: ${errorText}`);
        throw new Error(`Failed to update profile: ${errorText}`);
      }

      const responseData = await response.json();
      setUser(responseData); // Update the user in the context
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setSelectedImage(null); // Clear the selected image
    setPreviewImage(user.profilePicture); // Revert to the previous profile picture
    setIsEditing(false); // Exit edit mode
  };

  return (
    <form className="myaccount" onSubmit={handleSubmit}>
      <div className="myaccount-left">
        <p className="myaccount-title">My Profile</p>
        <div className="profile-img-container">
          <img
            src={
              previewImage
                ? previewImage.startsWith("blob:")
                  ? previewImage
                  : `${url}/api/users/image/${previewImage}`
                : "/src/assets/user.png"
            }
            alt="User Profile"
            className="profile-img"
          />
          <label className="camera-icon">
            <BiCamera />
            <input
              ref={fileInputRef}
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
