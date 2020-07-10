import { ActionTypes } from "../constants/ActionTypes";

export const addPin = (left, top) => ({
  type: ActionTypes.ADD_PIN,
  left,
  top,
});

export const moveItem = (id, left, top) => ({
  id,
  type: ActionTypes.MOVE_ITEM,
  left,
  top,
});
