import React, { useState } from "react";
import "./Profile.css";
import ProfileSideBar from "../../components/UserProfile/ProfileSideBar";
import Content from "../../components/U.Profile/Content";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import UserMessage from "../../components/UserMessage/UserMessage";
import UserHelp from "../../components/UserHelp/UserHelp";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="profile">
      <ProfileSideBar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="profile--content">
        {activeSection === "profile" && <Content /> }
      </div>
      <div className="order-history">
        {activeSection === "orderhistory" && <OrderHistory /> }
      </div>
      <div className="user-message">
        {activeSection === "usermessage" && <UserMessage /> }
      </div>
      <div className="user-help">
        {activeSection === "userhelp" && <UserHelp />}
      </div>
    </div>
  );
};

export default Profile;
