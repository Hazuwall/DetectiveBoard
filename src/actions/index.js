import { ActionTypes } from "../constants/ActionTypes";

export const addPin = (x, y) => ({
  type: ActionTypes.ADD_PIN,
  x,
  y,
});

export const moveNode = (id, x, y) => ({
  id,
  type: ActionTypes.MOVE_NODE,
  x,
  y,
});

export const moveItem = (id, type, x, y) => ({
  id,
  type: ActionTypes.MOVE_ITEM,
  itemType: type,
  x,
  y,
});
