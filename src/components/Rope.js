import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ItemTypes } from "../constants/ItemTypes";
import { selectItemWithTool } from "../actions";
import { ToolTypes } from "../constants/ToolTypes";
import "./Rope.css";

const mapStateToProps = (state) => {
  return {
    canSelect: state.board.toolType === ToolTypes.REMOVE_TOOL,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (id) => {
      dispatch(selectItemWithTool(id, ItemTypes.ROPE));
    },
  };
};

const Rope = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ id, node1, node2, isSelected, canSelect, onSelect }) => {
  const handleClick = (e) => {
    onSelect(id);
    e.stopPropagation();
  };

  return (
    <line
      className="rope"
      onClick={handleClick}
      x1={node1.x}
      y1={node1.y}
      x2={node2.x}
      y2={node2.y}
      stroke={isSelected ? "yellow" : "red"}
      cursor={canSelect ? "pointer" : "auto"}
    />
  );
});

Rope.propTypes = {
  id: PropTypes.number.isRequired,
  node1: PropTypes.object.isRequired,
  node2: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default Rope;
