import React from "react";
import { BiUser, BiMessage, BiHistory, BiHelpCircle, BiLogOut } from "react-icons/bi";
import "./ProfileSideBar.css";

const ProfileSideBar = ({setActiveSection,  activeSection }) => {
  return (
    <div className="profile-menu">
      <div className="profile-menu-list">
        <ul>
          <li><a href="#" className={`profile-item ${activeSection === "profile" ? "active" : ""}`} onClick={() => setActiveSection("profile")}>
              <BiUser className="profile-icon" />
              My Profile
            </a>
          </li>
          <li><a href="#" className={`profile-item ${activeSection === "orderhistory" ? "active" : ""}`} onClick={() => setActiveSection("orderhistory")}>
            <BiHistory className="profile-icon" />
            Order History
            </a>
          </li>
          <li><a href="#" className={`profile-item ${activeSection === "usermessage" ? "active" : ""}`} onClick={() => setActiveSection("usermessage")}>
            <BiMessage className="profile-icon" />
            Message
            </a>
          </li>
          <li><a href="#" className={`profile-item ${activeSection === "userhelp" ? "active" : ""}`} onClick={() => setActiveSection("userhelp")}>
            <BiHelpCircle className="profile-icon" />
            Help
            </a>
          </li>
          <li><a href="#" className={`profile-item ${activeSection === "userhelp" ? "active" : ""}`} onClick={() => setActiveSection("userhelp")}>
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
