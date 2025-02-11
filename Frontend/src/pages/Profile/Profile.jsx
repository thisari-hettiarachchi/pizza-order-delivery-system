import React, { useState } from "react";
import "./Profile.css";
import ProfileSideBar from "../../components/UserProfile/ProfileSideBar";
import ProfileContent from "../../components/ProfileContent/ProfileContent";
import UserMessage from "../../components/UserMessage/UserMessage";
import UserHelp from "../../components/UserHelp/UserHelp";
import UserOrder from "../UserOrder/UserOrder";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="profile">
      <ProfileSideBar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <div className="profile--content">
        {activeSection === "profile" && <ProfileContent />}
      </div>
      <div className="order-history">
        {activeSection === "orderhistory" && <UserOrder />}
      </div>
      <div className="user-message">
        {activeSection === "usermessage" && <UserMessage />}
      </div>
      <div className="user-help">
        {activeSection === "userhelp" && <UserHelp />}
      </div>
    </div>
  );
};

export default Profile;
