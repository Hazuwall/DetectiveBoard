import { ActionTypes } from "../constants/ActionTypes";

export const addPin = (x, y) => ({
  type: ActionTypes.ADD_PIN,
  x,
  y,
});

export const applyPointerTool = (id, itemType) => ({
  type: ActionTypes.APPLY_POINTER_TOOL,
  id,
  itemType,
});

export const toggleTool = (toolType) => ({
  type: ActionTypes.TOGGLE_TOOL,
  toolType,
});

export const moveItem = (id, itemType, x, y) => ({
  type: ActionTypes.MOVE_ITEM,
  id,
  itemType,
  x,
  y,
});

export const moveNode = (id, x, y) => ({
  type: ActionTypes.MOVE_NODE,
  id,
  x,
  y,
});
