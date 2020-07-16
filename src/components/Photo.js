import React from "react";
import PropTypes from "prop-types";
import "./Photo.css";
import DraggableItemBox from "./DraggableItemBox";
import { ItemTypes } from "../constants/ItemTypes";

function Photo(props) {
  const { url, isSelected, ...others } = props;
  return (
    <DraggableItemBox {...others} itemType={ItemTypes.PHOTO}>
      <img className="photo" alt="" src={url} />
    </DraggableItemBox>
  );
}

Photo.propTypes = {
  url: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,

  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  canDrag: PropTypes.bool,
  canSelect: PropTypes.bool,
  onDrag: PropTypes.func,
  onSelect: PropTypes.func,
};

Photo.defaultProps = {
  isSelected: false,
};

export default Photo;
