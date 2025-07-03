import React, { useState, useEffect, useContext } from "react";
import "./ProfileContent.css";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { auth } from "../../utils/firebase";
import { deleteUser } from "firebase/auth";

const ProfileContent = () => {
  const { userName, url, user, setUser, handleLogout } =
    useContext(StoreContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      fetch(`${url}/api/users/getuser/${userName}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [userName, setUser]);

  const handleDelete = async () => {
    if (!userName) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`${url}/api/users/delete/${userName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const currentUser = auth.currentUser;

        if (currentUser) {
          await deleteUser(currentUser);
          console.log("Firebase user deleted.");
        }

        alert("Account deleted successfully!");
        handleLogout();
        navigate("/", { replace: true });
      } else {
        toast.error("Failed to delete account. Please try again.");
      }
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        toast.error("Please log in again to delete your account.");
      } else {
        toast.error("Error deleting account. Please try again.");
        console.error("Error:", error);
      }
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
              onClick={handleDelete} 
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
