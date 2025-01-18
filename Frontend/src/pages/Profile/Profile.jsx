import React from "react";
import "./Profile.css";
import ProfileSideBar from "../../components/UserProfile/ProfileSideBar";
import Content from "../../components/UPSection/Content";

const Profile = () => {
  return (
    <div className="profile">
      <ProfileSideBar />
      <div className="profile--content">
        <Content /> 
      </div>
    </div>
  );
};

export default Profile;
