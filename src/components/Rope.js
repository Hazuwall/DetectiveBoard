import React from "react";
import PropTypes from "prop-types";
import "./Rope.css";
import { ItemTypes } from "../constants/ItemTypes";

const Rope = ({ id, knot1, knot2, isSelected, canSelect, onSelect }) => {
  const handleClick = (e) => {
    if (canSelect && onSelect) {
      onSelect(id, ItemTypes.ROPE);
      e.stopPropagation();
    }
  };

  let modifier;
  if (isSelected) modifier = "rope_selected";
  else if (canSelect) modifier = "rope_selectable";
  else modifier = "";

  return (
    <line
      className={"rope " + modifier}
      onClick={handleClick}
      x1={knot1.x}
      y1={knot1.y}
      x2={knot2.x}
      y2={knot2.y}
    />
  );
};

Rope.propTypes = {
  id: PropTypes.number.isRequired,
  knot1: PropTypes.object.isRequired,
  knot2: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  canSelect: PropTypes.bool,
  onSelect: PropTypes.func,
};

Rope.defaultProps = {
  isSelected: false,
  canSelect: false,
  onSelect: null,
};

export default Rope;
