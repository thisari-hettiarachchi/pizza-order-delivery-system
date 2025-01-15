import React from 'react';
import {
    BiHome, 
    BiBookAlt, 
    BiMessage, 
    BiSolisReport, 
    Bistats, 
    BiTask,
    BiHelpCirle, 
} from 'react-icons/bi';

const Sidebar = () => {
  return <div className='menu'>
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
            <BiSolisReport />
            Report
        </a>
        <a href="#" className="item">
            <BiMessage />
            Message
        </a>
        <a href="#" className="item">
            <BiHelpCirle />
            Help
        </a>
    </div>
  </div>
};

export default Sidebar;