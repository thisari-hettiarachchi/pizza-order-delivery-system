import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUser, BiMessage, BiHistory, BiHelpCircle, BiLogOut } from "react-icons/bi";
import "./ProfileSideBar.css";

const ProfileSideBar = ({ setActiveSection, activeSection }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('/path/to/api/profile')
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.log('Error fetching profile:', error));
  }, []);

  return (
    <div className="profile-menu">
      <div className="profile-header">
        {profile ? (
          <div className="profile-info">
            <img src={`/uploaded_files/${profile.image}`} alt="Profile" className="profile-image" />
            <p className="profile-name">{profile.name}</p>
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
              className={`profile-item ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => setActiveSection("profile")}
            >
              <BiUser className="profile-icon" />
              My Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`profile-item ${activeSection === "orderhistory" ? "active" : ""}`}
              onClick={() => setActiveSection("orderhistory")}
            >
              <BiHistory className="profile-icon" />
              Order History
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`profile-item ${activeSection === "usermessage" ? "active" : ""}`}
              onClick={() => setActiveSection("usermessage")}
            >
              <BiMessage className="profile-icon" />
              Message
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`profile-item ${activeSection === "userhelp" ? "active" : ""}`}
              onClick={() => setActiveSection("userhelp")}
            >
              <BiHelpCircle className="profile-icon" />
              Help
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`profile-item ${activeSection === "logout" ? "active" : ""}`}
              onClick={() => setActiveSection("logout")}
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
