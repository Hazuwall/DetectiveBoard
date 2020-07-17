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

const { itemType, children, ...others } = DraggableItemBox.propTypes;

Pin.propTypes = {
  isSelected: PropTypes.bool,
  ...others,
};

Pin.defaultProps = {
  isSelected: false,
};

export default Pin;
