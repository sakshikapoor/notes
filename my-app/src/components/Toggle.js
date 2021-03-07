import React from "react";
import "./Toggle.css";

const Toggle = ({ onToggle, isChecked }) => {
  return (
    <div className="toggle-container">
      <label className="toggle-switch">
        <input
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={e => onToggle(e.target.checked)}
        />
        <div className="toggle-slider round"></div>
      </label>
    </div>
  );
};

export default Toggle;
