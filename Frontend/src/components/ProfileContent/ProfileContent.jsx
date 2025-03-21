import React, { useState, useEffect, useContext } from "react";
import "./ProfileContent.css";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import { StoreContext } from "../../Context/StoreContext";

const { userName } = useContext(StoreContext);
const ProfileContent = ({ userName }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    profilePicture: "/default-user.png",
  });

  useEffect(() => {
    if (userName) {
      fetch(`http://localhost:8080/api/users/getuserbyname/${userName}`) // Fetch user profile using userName
        .then((response) => response.json())
        .then((data) => {
          setUser(data); // Update user state with the fetched data
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [userName]);

  const [isEditing, setIsEditing] = useState(false);
   

  return (
    <div>
      {isEditing ? (
        <ProfileEdit user={user} setUser={setUser} setIsEditing={setIsEditing} />
      ) : (
        <form className="myAccount">
          <div className="myAccount">
            <div className="profile-img-container">
              <img src={user.profilePicture} className="profile-img" />
            </div>
            <div className="myAccount-details">
              <p> Username: {userName}</p> {/* Display logged-in username */}
              <p> Email: {user.email}</p> {/* Display email from fetched user data */}
              <p> First Name: {user.firstName} </p>
              <p> Last Name: {user.lastName}</p>
              <p> Street: {user.street} </p>
              <p> City: {user.city} </p>
              <p> State: {user.state} </p>
              <p> Zip Code: {user.zipCode} </p>
              <p> Country: {user.country} </p>
              <p> Phone Number: {user.phone}</p>
            </div>
            <div className="myAccount-button">
              <button type="button" className="myAccount-upbutton" onClick={() => setIsEditing(true)}>
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
