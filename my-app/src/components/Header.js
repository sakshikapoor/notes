import React, { useState } from "react";
import "./Header.css";
import { useDispatch } from "react-redux";
import { toggle } from "../actions/sidebarActions";
import searchActions from "../actions/searchAction";

const Header = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSideBar = () => {
    dispatch(toggle());
  };

  const handleChange = e => setSearchTerm(e.target.value);

  const handleKeyUp = e => {
    // search on enter
    if (e.keyCode == 13) {
      dispatch(searchActions.openSearch(searchTerm));
    }
  };

  const clearSearch = () => {
    // nope.
    document.getElementById("myInput").value = "";
    dispatch(searchActions.closeSearch());
    setSearchTerm("");
  };

  return (
    <div className="header-container">
      <div className="header-hamburger" onClick={toggleSideBar}>
        ☰
      </div>
      <h2>Keep</h2>
      <input
        type="text"
        value={searchTerm}
        name="searchbox"
        className="header-searchBox"
        id="myInput"
        placeholder="Type and press enter to search..."
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
  );
};

export default Header;
