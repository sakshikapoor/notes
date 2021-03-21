import React, { useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../actions/sidebarActions";
import searchActions from "../actions/searchAction";
import Toggle from "./Toggle";
import { setTheme } from "../actions/themeActions";

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

const openSearch = (dispatch, searchTerm) => {
  dispatch(searchActions.openSearch(searchTerm));
}

const debouncedOpenSearch = debounce(openSearch, 500);

const Header = () => {
  const dispatch = useDispatch();
  const search = useSelector(state => state.search);
  const [searchTerm, setSearchTerm] = useState(search);
  const theme = useSelector(state => state.theme);
  const toggleSideBar = () => {
    dispatch(toggle());
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const clearSearch = () => {
    dispatch(searchActions.closeSearch());
    setSearchTerm("");
  };

  const onToggle = checked => {
    dispatch(setTheme(checked ? "dark" : "light"));
  };

  const handleKeyUp = (e) => {
    debouncedOpenSearch(dispatch, searchTerm)
  }

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
          &#x2630;
        </button>

        <input
          type="text"
          value={searchTerm}
          name="searchbox"
          className="header-searchBox"
          id="myInput"
          placeholder="Type to search..."
          onChange={handleChange}
          onKeyUp={handleKeyUp}
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
