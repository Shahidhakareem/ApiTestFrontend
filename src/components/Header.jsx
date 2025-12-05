// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/main_logo.png";


const Header = () => {

  const navigate = useNavigate()

  const handleLogo = () =>{
    navigate("/")
  }
  return (
    <div className="flex items-center justify-between p-2 h-12 border-b border-gray-200 bg-white shadow-sm">
      {/* Left Side: Logo/Workspace */}
      <div className="flex items-center   space-x-4">
        <span>
          {" "}
          <div onClick={handleLogo}>
            {" "}
            <img
              alt=""
              src={logo}
              className="h-20 w-auto mx-auto py-6 cursor-pointer"
            />
          </div>
        </span><br/>
        <span className="text-md font-bold text-blue-500">
          API Testing Tool
        </span>
        <button className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
          Shahidkha Kareem's Workspace
        </button>
      </div>

      {/* Right Side: Search and Actions */}
      <div className="flex items-center space-x-3">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="p-1 px-3 border border-gray-300 rounded text-sm w-64 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
        <button className="text-gray-600 hover:text-orange-500">⚙️</button>{" "}
        {/* Settings Icon */}
      </div>
    </div>
  );
};

export default Header;
