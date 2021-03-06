import React, { useState } from "react";
import "./Header.css";
import { useDispatch } from "react-redux";
import { toggle } from "../actions/sidebarActions";
import searchActions from "../actions/searchAction";
import Toggle from "./Toggle";
import { setTheme } from "../actions/themeActions";

const Header = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

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
    console.log("togge value", checked);
    dispatch(setTheme(checked ? "dark" : "light"));
  };

  return (
    <div className="header-container">
      <div className="header-left">
        <div className="header-hamburger" onClick={toggleSideBar}>
          ☰
        </div>
        <h1>NOTES</h1>
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

      <div className="header-toggle-btn header-right">
        <Toggle onToggle={onToggle} />
      </div>
    </div>
  );
};

export default Header;
