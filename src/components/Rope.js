import React from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../constants/ItemTypes";

function Rope({ start, end }) {
  return <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="red" />;
}

Rope.propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
};

export default Rope;
