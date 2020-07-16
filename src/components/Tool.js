import React from "react";
import PropTypes from "prop-types";
import "./Tool.css";

const Tool = ({ onClick, isActive, text }) => {
  return (
    <button
      className={isActive ? "tool tool_active" : "tool"}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Tool.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

Tool.defaultProps = {
  isActive: false,
};

export default Tool;
