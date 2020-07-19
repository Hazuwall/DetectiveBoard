import React from "react";
import PropTypes from "prop-types";
import "./Tool.css";

const Tool = ({ onClick, isActive, icon, text }) => {
  return (
    <div
      title={text}
      className={isActive ? "tool tool_active" : "tool"}
      onClick={onClick}
    >
      <img draggable="false" className="tool-icon" src={icon} alt="" />
    </div>
  );
};

Tool.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

Tool.defaultProps = {
  isActive: false,
};

export default Tool;
