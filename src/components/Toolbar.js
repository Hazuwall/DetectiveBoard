import React from "react";
import "./Toolbar.css";
import EffectTool from "./EffectTool";
import { ToolTypes } from "../constants/ToolTypes";
import PhotoPickerTool from "./PhotoPickerTool";
import ClearBoardTool from "./ClearBoardTool";
import moveIcon from "../assets/icon-move.png";
import pinIcon from "../assets/icon-pin.png";
import ropeIcon from "../assets/icon-projectmerge.png";
import photoIcon from "../assets/icon-portrait.png";
import removeIcon from "../assets/icon-trash.png";
import clearIcon from "../assets/icon-recycle.png";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <EffectTool icon={moveIcon} text="Move" toolType={ToolTypes.MOVE_TOOL} />
      <EffectTool
        icon={pinIcon}
        text="Add Pin"
        toolType={ToolTypes.ADD_PIN_TOOL}
      />
      <EffectTool
        icon={ropeIcon}
        text="Tie Rope"
        toolType={ToolTypes.TIE_ROPE_TOOL}
      />
      <PhotoPickerTool icon={photoIcon} text="Pick Photos" />
      <EffectTool
        icon={removeIcon}
        text="Remove"
        toolType={ToolTypes.REMOVE_TOOL}
      />
      <div className="toolbar-danger-container">
        <ClearBoardTool icon={clearIcon} text="Clear Board" />
      </div>
    </div>
  );
};

export default Toolbar;
