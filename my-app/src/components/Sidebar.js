import React from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import tabs from "../initializations/tabs";
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const showSideBar = useSelector(state => state.sideBar);
  const selectedTab = useSelector(state => state.selectedTab);

  const tabViews = tabs.map(tab => {
    return (
      <Link to={`/notes/${tab.id}`}>
        <button
          key={tab.id}
          className={
            selectedTab === tab.id
              ? "sidebar-tabs sidebar-selected "
              : "sidebar-tabs"
          }
        >
          {tab.name}
        </button>
      </Link>
    );
  });

  const sidebarStyle = showSideBar ? {} : { 'width': "0px", 'position': 'unset', 'zIndex': 'unset' };

  return (
    <div className="sidebar-container" style={sidebarStyle}>
      {tabViews}
    </div>
  );
};

export default Sidebar;
