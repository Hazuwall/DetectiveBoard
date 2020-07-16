import React from "react";
import PropTypes from "prop-types";
import DraggableItemBox from "./DraggableItemBox";
import { ItemTypes } from "../constants/ItemTypes";

function Pin(props) {
  const { isSelected, ...others } = props;
  return (
    <DraggableItemBox {...others} itemType={ItemTypes.PIN}>
      <svg
        width="25px"
        height="25px"
        viewBox="0 0 100 100"
        version="1.1"
        fill={isSelected ? "yellow" : "blue"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
    </DraggableItemBox>
  );
}

Pin.propTypes = {
  isSelected: PropTypes.bool,

  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  canDrag: PropTypes.bool,
  canSelect: PropTypes.bool,
  onDrag: PropTypes.func,
  onSelect: PropTypes.func,
};

Pin.defaultProps = {
  isSelected: false,
};

export default Pin;
