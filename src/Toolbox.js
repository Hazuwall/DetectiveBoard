import React from "react";
import "./Toolbox.css";
import Pin from "./Pin";

function Toolbox() {
  return (
    <div className="toolbox">
      <div className="slot">
        <Pin />
      </div>
      <div className="slot">
        <img className="slot-img" src="thread.png" alt="Thread" />
      </div>
      <div className="slot">
        <img className="slot-img" src="picture.png" alt="Upload Picture" />
      </div>
    </div>
  );
}

export default Toolbox;
