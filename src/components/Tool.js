import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Toolbar.css";
import { toggleTool } from "../actions";

const mapStateToProps = (state) => {
  return { currentToolType: state.board.toolType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: (type) => {
      dispatch(toggleTool(type));
    },
  };
};

const Tool = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ onToggle, currentToolType, toolType, text }) => {
  return (
    <div>
      <button
        style={{
          backgroundColor: toolType === currentToolType ? "red" : "grey",
        }}
        onClick={() => onToggle(toolType)}
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
