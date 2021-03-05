import React, { useState } from "react";
import "./Header.css";
import { useDispatch } from "react-redux";
import { toggle } from "../actions/sidebarActions";

const Header = () => {
  const dispatch = useDispatch();

  const toggleSideBar = () => {
    dispatch(toggle());
  };
  return (
    <div className="header-container">
      <div className="header-hamburger" onClick={toggleSideBar}>
        ☰
      </div>
      <h2>Keep</h2>
      <input
        type="text"
        name="searchbox"
        className="header-searchBox"
        placeholder="Search"
      />
    </div>
  );
};

export default Header;
