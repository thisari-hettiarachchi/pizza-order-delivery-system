import React, { useState, useContext, useEffect } from "react";
import {
  BiUser,
  BiMessage,
  BiHistory,
  BiHelpCircle,
  BiLogOut,
} from "react-icons/bi";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import "./ProfileSideBar.css";

const ProfileSideBar = ({ setActiveSection, activeSection }) => {
  const { userName, handleLogout, url, user, token } = useContext(StoreContext);
  const [profileImageUrl, setProfileImageUrl] = useState(assets.userPic);

  const handleBackgroundClick = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (user?.profilePicture) {
        try {
          const response = await fetch(
            `${url}/api/users/image/${user.profilePicture}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setProfileImageUrl(imageUrl);
          }
        } catch (error) {
          console.error("Error fetching profile image:", error);
          setProfileImageUrl(assets.userPic); // Fallback to default
        }
      } else {
        setProfileImageUrl(assets.userPic);
      }
    };

    fetchProfileImage();

    // Cleanup blob URL on unmount
    return () => {
      if (profileImageUrl !== assets.userPic) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [user?.profilePicture]);

  return (
    <div
      className="profile-menu"
      onClick={() => handleBackgroundClick("profile")}
    >
      <div className="profile-header">
        {user ? (
          <div className="profile-info">
            <img
              src={profileImageUrl}
              className="profile_image"
              alt="Profile"
            />
            <p className="profile-username">{userName}</p>
          </div>
        ) : (
          <p>Profile Not Found...</p>
        )}
      </div>

      <div className="profile-menu-list">
        <ul>
          <li>
            <a
              href="#"
              className={`profile-item ${
                activeSection === "profile" ? "active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleBackgroundClick("profile");
              }}
            >
              <BiUser className="profile-icon" />
              My Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`profile-item ${
                activeSection === "orderhistory" ? "active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleBackgroundClick("orderhistory");
              }}
            >
              <BiHistory className="profile-icon" />
              Order History
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`profile-item ${
                activeSection === "usermessage" ? "active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleBackgroundClick("usermessage");
              }}
            >
              <BiMessage className="profile-icon" />
              Message
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`profile-item ${
                activeSection === "userhelp" ? "active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleBackgroundClick("userhelp");
              }}
            >
              <BiHelpCircle className="profile-icon" />
              Help
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`profile-item ${
                activeSection === "logout" ? "active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                const userConfirmed = window.confirm(
                  "Are you sure you want to log out?"
                );
                if (!userConfirmed) return;
                handleLogout();
              }}
            >
              <BiLogOut className="profile-icon" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSideBar;
