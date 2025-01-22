import React from "react";
import { Link } from "react-router-dom";
import { BiUser, BiMessage, BiHistory, BiHelpCircle } from "react-icons/bi";
import "./ProfileSideBar.css";

const ProfileSideBar = () => {
  return (
    <div className="profile-menu">
      <div className="profile-menu-list">
        <a href="#" className="profile-item">
          <BiUser className="profile-icon" />
          My Profile
        </a>
        <Link to={"/userorder"} className="profile-item">
          <BiHistory className="profile-icon" />
          Order History
        </Link>
        <a href="#" className="profile-item">
          <BiMessage className="profile-icon" />
          Message
        </a>
        <a href="#" className="profile-item">
          <BiHelpCircle className="profile-icon" />
          Help
        </a>
      </div>
    </div>
  );
};

export default ProfileSideBar;
