export const ToolTypes = {
  ADD_PIN_TOOL: "ADD_PIN_TOOL",
  MOVE_TOOL: "MOVE_TOOL",
  NO_TOOL: "NO_TOOL",
  REMOVE_TOOL: "REMOVE_TOOL",
};

export const isPointerTool = (tool) => {
  return (
    tool !== ToolTypes.MOVE_TOOL &&
    tool !== ToolTypes.NO_TOOL &&
    tool !== ToolTypes.ADD_PIN_TOOL
  );
};
