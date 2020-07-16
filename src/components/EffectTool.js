import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toggleTool } from "../actions";
import Tool from "./Tool";

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

const EffectTool = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ onToggle, currentToolType, toolType, text }) => {
  return (
    <Tool
      text={text}
      onClick={() => onToggle(toolType)}
      isActive={toolType === currentToolType}
    />
  );
});

EffectTool.propTypes = {
  toolType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default EffectTool;
