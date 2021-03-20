import React from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import tabs from "../initializations/tabs";
import selectTab from "../actions/tabSelection";

const Sidebar = () => {
  const showSideBar = useSelector(state => state.sideBar);
  const selectedTab = useSelector(state => state.selectedTab);

  const dispatch = useDispatch();

  const selectThisTab = id => {
    dispatch(selectTab(id));
  };

  const tabViews = tabs.map(tab => {
    return (
      <button
        key={tab.id}
        onClick={() => selectThisTab(tab.id)}
        className={
          selectedTab === tab.id
            ? "sidebar-tabs sidebar-selected "
            : "sidebar-tabs"
        }
      >
        {tab.name}
      </button>
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
