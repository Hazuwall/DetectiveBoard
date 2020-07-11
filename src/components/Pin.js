import React from "react";
import PropTypes from "prop-types";
import DraggableItemBox from "./DraggableItemBox";

function Pin({ id, pos }) {
  return (
    <DraggableItemBox id={id} pos={pos}>
      <svg
        width="100px"
        height="100px"
        viewBox="0 0 120 120"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="60" />
      </svg>
    </DraggableItemBox>
  );
}

Pin.propTypes = {
  id: PropTypes.number.isRequired,
  pos: PropTypes.object.isRequired,
};

export default Pin;
