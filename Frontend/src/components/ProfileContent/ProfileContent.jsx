import React, { useState, useEffect, useContext } from "react";
import "./ProfileContent.css";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const ProfileContent = () => {
  const { userName, url, user, setUser } = useContext(StoreContext);
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <div>
      {isEditing ? (
        <ProfileEdit
          user={user}
          setUser={setUser}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="myAccount">
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
              type="submit"
              className="myAccount-dltbutton"
              disabled={isUpdating}
            >
              {isUpdating ? "Dleting..." : "Delete"}
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
