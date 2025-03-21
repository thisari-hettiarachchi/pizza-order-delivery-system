import React, { useState, useEffect, useContext } from "react";
import "./ProfileContent.css";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import { StoreContext } from "../../Context/StoreContext";

const ProfileContent = () => {
  const { userName, email } = useContext(StoreContext); // Get username and email from context
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: email || "", // Default email from context
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    profilePicture: "",  // Default image
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
  
    fetch(`http://localhost:8080/api/users/uploadProfilePicture/${user.userName}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUser((prevUser) => ({ ...prevUser, profilePicture: data.profilePicture }));
      })
      .catch((error) => console.error("Error uploading image:", error));
  };
  

  useEffect(() => {
    if (userName) {
      fetch(`http://localhost:8080/api/users/getuserbyname/${userName}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched user data:", data); // Debugging
          setUser((prevUser) => ({
            ...prevUser,
            ...data, 
            profilePicture: data.profilePicture || prevUser.profilePicture, // Ensure profile picture updates
          }));
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [userName]);
  

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <ProfileEdit user={user} setUser={setUser} setIsEditing={setIsEditing} />
      ) : (
        <div className="myAccount">
          <div className="profile-img-container">
            <img 
              src={user.profilePicture ? `http://localhost:8080/uploads/${user.profilePicture}` : "/default-user.png"} 
              className="profile-img" 
            />

          </div>
          <div className="myAccount-details">
            <p>Username: {userName}</p> {/* Display the username */}
            <p>Email: {user.email || email}</p> {/* Display the email from user state or context */}
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Street: {user.street}</p>
            <p>City: {user.city}</p>
            <p>State: {user.state}</p>
            <p>Zip Code: {user.zipCode}</p>  
            <p>Country: {user.country}</p>
            <p>Phone Number: {user.phone}</p>
          </div>

          <div className="myAccount-button">
            <button type="button" className="myAccount-upbutton" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
