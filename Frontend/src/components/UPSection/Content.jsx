import React from "react";
import { BiCamera } from "react-icons/bi";
import "./Content.css";

export const Content = () => {
  return (
    <form className="myaccount">
      <div className="myaccount-left">
        <p className="myaccount-title">My Profile</p>
        <div className="myaccount-mutli-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="myaccount-mutli-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="myaccount-mutli-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
        <div className="myaccount-button">
            <button className="myaccount-upbutton">Update</button>
            <button className="myaccount-cancelbutton">Cancel</button>
        </div>
      </div>
      
      <div className="myaccount-right">
        <div className="profile-img-container">
            <img src="/src/assets/user.png" alt="User Profile" className="profile-img"/>
            <button className="camera-icon">
            <BiCamera />
            </button>
        </div>
      </div>

    </form>
  );
};

export default Content;
