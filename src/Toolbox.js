import React from "react";
import "./Toolbox.css";

function Toolbox() {
  return (
    <div className="toolbox">
      <div className="slot">
        <img
          className="slot-img"
          draggable="true"
          src="pin.png"
          alt="Push Pin"
        />
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
