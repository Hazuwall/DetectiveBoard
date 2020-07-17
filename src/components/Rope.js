import React from "react";
import PropTypes from "prop-types";
import "./Rope.css";

const Rope = ({ id, knot1, knot2, isSelected, canSelect, onSelect }) => {
  const handleClick = (e) => {
    if (canSelect && onSelect) {
      onSelect(id);
      e.stopPropagation();
    }
  };

  return (
    <line
      className="rope"
      onClick={handleClick}
      x1={knot1.x}
      y1={knot1.y}
      x2={knot2.x}
      y2={knot2.y}
      stroke={isSelected ? "yellow" : "red"}
      cursor={canSelect ? "pointer" : "auto"}
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
