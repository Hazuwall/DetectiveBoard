import React from "react";
import PropTypes from "prop-types";
import "./Rope.css";

const Rope = ({ id, node1, node2, isSelected, canSelect, onSelect }) => {
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
      x1={node1.x}
      y1={node1.y}
      x2={node2.x}
      y2={node2.y}
      stroke={isSelected ? "yellow" : "red"}
      cursor={canSelect ? "pointer" : "auto"}
    />
  );
};

Rope.propTypes = {
  id: PropTypes.number.isRequired,
  node1: PropTypes.object.isRequired,
  node2: PropTypes.object.isRequired,
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
