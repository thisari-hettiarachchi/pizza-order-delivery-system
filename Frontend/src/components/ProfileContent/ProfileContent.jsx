import React, { useState, useEffect, useContext } from "react";
import "./ProfileContent.css";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const ProfileContent = () => {
  const { userName, url, user, setUser } = useContext(StoreContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // Added state for deleting

  useEffect(() => {
    if (userName) {
      fetch(`http://localhost:8080/api/users/getuser/${userName}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [userName, setUser]);

  const handleDelete = async () => {
    if (!userName) return;
  
    setIsDeleting(true);
  
    try {
      // Update URL to match the backend delete endpoint
      const response = await fetch(`http://localhost:8080/api/users/${userName}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Account deleted successfully!");
        // Optionally, redirect the user or reset the state
      } else {
        alert("Failed to delete account. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred. Please try again.");
    }
  
    setIsDeleting(false);
  };
   

  return (
    <div>
      {isEditing ? (
        <ProfileEdit
          user={user}
          setUser={setUser}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="myAccount-content">
          <div className="profile-img-container">
            <img
              src={
                user?.profilePicture
                  ? url + "/api/users/image/" + user.profilePicture
                  : assets.userPic
              }
              className="profile-img"
              alt="User Profile"
            />
          </div>
          <div className="myAccount-details">
            <p>Username: {userName}</p>
            <p>Email: {user?.email}</p>
            <p>First Name: {user?.firstName}</p>
            <p>Last Name: {user?.lastName}</p>
            <p>Street: {user?.address?.street || "N/A"}</p>
            <p>City: {user?.address?.city || "N/A"}</p>
            <p>State: {user?.address?.state || "N/A"}</p>
            <p>Zip Code: {user?.address?.zipCode || "N/A"}</p>
            <p>Country: {user?.address?.country || "N/A"}</p>
            <p>Phone Number: {user?.contactNumber || "N/A"}</p>
          </div>

          <div className="myAccount-button">
            <button
              type="button"
              className="myAccount-upbutton"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="myAccount-dltbutton"
              disabled={isDeleting}
              onClick={handleDelete} // Add this event
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
