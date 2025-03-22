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
  const { userName, handleLogout, url, user } = useContext(StoreContext);

  const handleBackgroundClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div
      className="profile-menu"
      onClick={() => handleBackgroundClick("profile")}
    >
      <div className="profile-header">
        {user ? (
          <div className="profile-info">
            <img
              src={
                user.profilePicture
                  ? url + "/api/users/image/" + user.profilePicture
                  : assets.userPic
              }
              className="profile_image"
             
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
