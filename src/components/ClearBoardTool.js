import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearBoard } from "../actions";
import Tool from "./Tool";

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch(clearBoard()),
  };
};

const ClearBoardTool = connect(null, mapDispatchToProps)(Tool);

ClearBoardTool.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ClearBoardTool;
