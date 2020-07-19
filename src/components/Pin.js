import React from "react";
import BoardItemBox from "./BoardItemBox";
import { ItemTypes } from "../constants/ItemTypes";
import pinImage from "../assets/pin.png";
import "./Pin.css";

function Pin(props) {
  return (
    <BoardItemBox {...props} className="pin-container" itemType={ItemTypes.PIN}>
      <img draggable="false" className="pin" src={pinImage} alt="" />
    </BoardItemBox>
  );
}

export default Pin;
