import React from "react";
import "./Toolbar.css";
import EffectTool from "./EffectTool";
import { ToolTypes } from "../constants/ToolTypes";
import PhotoPickerTool from "./PhotoPickerTool";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <EffectTool text="Move" toolType={ToolTypes.MOVE_TOOL} />
      <EffectTool text="AddPin" toolType={ToolTypes.ADD_PIN_TOOL} />
      <EffectTool text="TieRope" toolType={ToolTypes.TIE_ROPE_TOOL} />
      <PhotoPickerTool text="PickPhotos" />
      <EffectTool text="Remove" toolType={ToolTypes.REMOVE_TOOL} />
    </div>
  );
};

export default Toolbar;
