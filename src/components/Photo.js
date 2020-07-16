import React from "react";
import PropTypes from "prop-types";
import "./Photo.css";
import DraggableItemBox from "./DraggableItemBox";
import { ItemTypes } from "../constants/ItemTypes";

function Photo({ id, x, y, url, isSelected }) {
  return (
    <DraggableItemBox id={id} itemType={ItemTypes.PHOTO} x={x} y={y}>
      <img className="photo" alt="" src={url} />
    </DraggableItemBox>
  );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default Photo;
