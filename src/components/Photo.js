import React from "react";
import PropTypes from "prop-types";
import "./Photo.css";
import BoardItemBox from "./BoardItemBox";
import { ItemTypes } from "../constants/ItemTypes";

function Photo(props) {
  const { url, ...others } = props;
  return (
    <BoardItemBox {...others} itemType={ItemTypes.PHOTO}>
      <img className="photo" alt="" src={url} />
    </BoardItemBox>
  );
}

Photo.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Photo;
