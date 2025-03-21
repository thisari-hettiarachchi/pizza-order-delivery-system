import React, { useState, useEffect, useContext } from "react";
import "./ProfileContent.css";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import { StoreContext } from "../../Context/StoreContext";

const ProfileContent = () => {
  const { userName } = useContext(StoreContext);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    contactNumber: "",
    profilePicture: "",
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    fetch(`http://localhost:8080/api/users/uploadProfilePicture/${userName}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: data.profilePicture || prevUser.profilePicture,
        }));
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  useEffect(() => {
    if (userName) {
      fetch(`http://localhost:8080/api/users/getuser/${userName}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched user data:", data); // Debugging

          setUser((prevUser) => ({
            ...prevUser,
            ...data,
            address: data.address || prevUser.address, // Ensure address exists
            profilePicture: data.profilePicture || prevUser.profilePicture,
          }));
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [userName]);

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
                user.profilePicture
                  ? `http://localhost:8080/uploads/${user.profilePicture}`
                  : "/default-user.png"
              }
              className="profile-img"
              alt="User Profile"
            />
          </div>
          <div className="myAccount-details">
            <p>Username: {userName}</p>
            <p>Email: {user.email}</p>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Street: {user.address?.street || "N/A"}</p>
            <p>City: {user.address?.city || "N/A"}</p>
            <p>State: {user.address?.state || "N/A"}</p>
            <p>Zip Code: {user.address?.zipCode || "N/A"}</p>
            <p>Country: {user.address?.country || "N/A"}</p>
            <p>Phone Number: {user.contactNumber || "N/A"}</p>
          </div>

          <div className="myAccount-button">
            <button
              type="button"
              className="myAccount-upbutton"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
