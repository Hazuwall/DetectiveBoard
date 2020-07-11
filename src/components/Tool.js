import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Toolbar.css";
import { toggleTool } from "../actions";

const mapStateToProps = (state) => {
  return { currentToolType: state.toolType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    boundToggleTool: (type) => {
      dispatch(toggleTool(type));
    },
  };
};

const Tool = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ boundToggleTool, currentToolType, toolType, text }) => {
  const handleClick = () => {
    boundToggleTool(toolType);
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: toolType === currentToolType ? "red" : "grey",
        }}
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  );
});

Tool.propTypes = {
  toolType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Tool;
