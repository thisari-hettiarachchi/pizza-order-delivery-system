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
            <span> Username: </span> <p>{userName}</p>
            <span>Email: </span>
            <p>{user?.email}</p>
            <span>First Name: </span>
            <p>{user?.firstName}</p>
            <span>Last Name: </span>
            <p>{user?.lastName}</p>
            <span>Street: </span>
            <p>{user?.address?.street || "N/A"}</p>
            <span>City: </span>
            <p>{user?.address?.city || "N/A"}</p>
            <span>State: </span>
            <p>{user?.address?.state || "N/A"}</p>
            <span>Zip Code: </span>
            <p>{user?.address?.zipCode || "N/A"}</p>
            <span>Country: </span>
            <p>{user?.address?.country || "N/A"}</p>
            <span>Phone Number: </span>
            <p>{user?.contactNumber || "N/A"}</p>
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
