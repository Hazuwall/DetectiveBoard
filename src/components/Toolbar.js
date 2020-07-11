import React from "react";
import "./Toolbar.css";
import Tool from "./Tool";
import { ToolTypes } from "../constants/ToolTypes";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <Tool text="Move" toolType={ToolTypes.MOVE_TOOL} />
      <Tool text="AddPin" toolType={ToolTypes.ADD_PIN_TOOL} />
    </div>
  );
};

export default Toolbar;
