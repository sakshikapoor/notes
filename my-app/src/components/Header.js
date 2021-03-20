import React, { useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../actions/sidebarActions";
import searchActions from "../actions/searchAction";
import Toggle from "./Toggle";
import { setTheme } from "../actions/themeActions";

const Header = () => {
  const dispatch = useDispatch();
  const search = useSelector(state => state.search);
  const [searchTerm, setSearchTerm] = useState(search);
  const theme = useSelector(state => state.theme);

  const toggleSideBar = () => {
    dispatch(toggle());
  };

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleKeyUp = e => {
    // search on enter
    if (e.keyCode == 13) {
      dispatch(searchActions.openSearch(searchTerm));
    }
  };

  const onBlurHandler = () => {
    setSearchTerm("");
    dispatch(searchActions.closeSearch());
  };

  const clearSearch = () => {
    dispatch(searchActions.closeSearch());
    setSearchTerm("");
  };

  const onToggle = checked => {
    dispatch(setTheme(checked ? "dark" : "light"));
  };

  return (
    <div className="header-container">
      <div className="header-top">
        <h1>NOTES</h1>
        <div className="header-toggle-btn">
          <Toggle onToggle={onToggle} isChecked={theme === "dark"} />
        </div>
      </div>
      <div className="header-bottom">
        <button className="header-hamburger" onClick={toggleSideBar}>
          ☰
        </button>

        <input
          type="text"
          value={searchTerm}
          name="searchbox"
          className="header-searchBox"
          id="myInput"
          placeholder="Type and press enter to search..."
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onBlur={onBlurHandler}
        />
        {/* show search clear icon only if search is active */}
        {searchTerm ? (
          <div className="clear-search" onClick={clearSearch}>
            &#10005;
          </div>
        ) : (
            ""
          )}
      </div>
    </div>
  );
};

export default Header;
