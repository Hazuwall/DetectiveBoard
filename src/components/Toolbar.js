import React from "react";
import "./Toolbar.css";
import Tool from "./Tool";
import { ToolTypes } from "../constants/ToolTypes";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <Tool text="Move" toolType={ToolTypes.MOVE_TOOL} />
      <Tool text="AddPin" toolType={ToolTypes.ADD_PIN_TOOL} />
      <Tool text="TieRope" toolType={ToolTypes.TIE_ROPE_TOOL} />
      <Tool text="Remove" toolType={ToolTypes.REMOVE_TOOL} />
    </div>
  );
};

export default Toolbar;
