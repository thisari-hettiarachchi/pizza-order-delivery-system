import React from "react";
import "./ProfileSideBar.css";
import {
  BiHome,
  BiBookAlt,
  BiMessage,
  BiSolidReport,
  BiStats,
  BiTask,
  BiHelpCircle,
} from "react-icons/bi";

const ProfileSideBar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt />
        <h2>EduFlex</h2>
      </div>

      <div className="menu-list">
        <a href="#" className="item">
          <BiHome />
          Assignment
        </a>
        <a href="#" className="item">
          <BiSolidReport />
          Report
        </a>
        <a href="#" className="item">
          <BiMessage />
          Message
        </a>
        <a href="#" className="item">
          <BiHelpCircle />
          Help
        </a>
      </div>
    </div>
  );
};

export default ProfileSideBar;
