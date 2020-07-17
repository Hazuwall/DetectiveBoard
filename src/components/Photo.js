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

const { itemType, children, ...others } = DraggableItemBox.propTypes;

Photo.propTypes = {
  url: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  ...others,
};

Photo.defaultProps = {
  isSelected: false,
};

export default Photo;
