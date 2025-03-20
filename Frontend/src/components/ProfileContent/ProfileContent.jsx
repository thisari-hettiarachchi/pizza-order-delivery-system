import React, { useState } from "react";
import "./ProfileContent.css";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit"; // Import ProfileEdit component

const ProfileContent = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    profilePicture: "/default-user.png",
  });

  const [popup, setPopup] = useState({ message: "", type: "" });
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

  // Show popup messages
  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  // Handle Edit Button Click
  const handleEditClick = () => {
    setIsEditing(true); // Switch to edit mode
  };

  return (
    <div>
      {/* Show ProfileEdit component when in edit mode */}
      {isEditing ? (
        <ProfileEdit user={user} setUser={setUser} setIsEditing={setIsEditing} />
      ) : (
        <form className="myAccount">
          {/* Popup Message */}
          {popup.message && <div className={`popup ${popup.type}`}>{popup.message}</div>}

          <div className="myAccount">
            <div className="profile-img-container">
              <img
                src={user.profilePicture}
                className="profile-img"
              />
            </div>
            <div className="myAccount-details">
              <p> First Name : {user.firstName} </p>
              <p> Last Name :{user.lastName}</p>
              <p> Email :{user.email}</p>
              <p> Street :{user.street} </p>
              <p> City : {user.city} </p>
              <p> State : {user.state} </p>
              <p> Zip Code : {user.zipCode} </p>
              <p> Country :{user.country} </p> 
              <p>Phone Number :{user.phone}</p>
            </div>
            <div className="myAccount-button">
              <button type="button" className="myAccount-upbutton" onClick={handleEditClick}>
                Edit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileContent;
