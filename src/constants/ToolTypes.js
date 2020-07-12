export const ToolTypes = {
  ADD_PIN_TOOL: "ADD_PIN_TOOL",
  MOVE_TOOL: "MOVE_TOOL",
  REMOVE_TOOL: "REMOVE_TOOL",
  TIE_ROPE_TOOL: "TIE_ROPE_TOOL",
};

export const isPointerTool = (tool) => {
  return tool === ToolTypes.REMOVE_TOOL || tool === ToolTypes.TIE_ROPE_TOOL;
};
