import React, { useEffect } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import tabs from "../initializations/tabs";
import { Link, useHistory, useParams } from 'react-router-dom'
import tabActions from '../actions/tabActions';

const Sidebar = () => {
  const showSideBar = useSelector(state => state.sideBar);
  const selectedTab = useSelector(state => state.selectedTab);
  const dispatch = useDispatch();
  const history = useHistory()

  const urlParams = useParams()
  const category = urlParams.category

  const tabToSelect = tabs
    .map(tab => tab.id)  // ['all', 'pinned', ...]
    .find(id => id === category)

  // side effect in useEffect
  useEffect(() => {
    if (tabToSelect) {
      dispatch(tabActions.selectTab(tabToSelect))
    } else if (!category) {
      // handles /notes
      history.push(`/notes/${tabs[0].id}`)
    } else {
      // handles /notes/gibberish
      history.push('/urlnotfound')
    }
  })


  const tabViews = tabs.map(tab => {
    return (
      <Link to={`/notes/${tab.id}`} key={tab.id}>
        <button
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
