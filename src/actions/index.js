import { ActionTypes } from "../constants/ActionTypes";
import { ItemTypes } from "../constants/ItemTypes";
import { ToolTypes } from "../constants/ToolTypes";

export const addPhotos = (urls, x = 300, y = 300) => ({
  type: ActionTypes.ADD_PHOTOS,
  urls,
  x,
  y,
});

export const addPin = (x, y) => ({
  type: ActionTypes.ADD_PIN,
  x,
  y,
});

export const clickSpaceWithTool = (x, y) => (dispatch, getState) => {
  const boardState = getState().board;
  if (boardState.toolType === ToolTypes.ADD_PIN_TOOL)
    return dispatch(addPin(x, y));
  else if (boardState.selectedItem !== null) return dispatch(unselectItem());
};

export const addRope = (node1, node2) => ({
  type: ActionTypes.ADD_ROPE,
  node1,
  node2,
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

export const removeItem = (id, itemType) => ({
  type: ActionTypes.REMOVE_ITEM,
  id,
  itemType,
});

export const removeItemWithDisposal = (id, itemType) => (
  dispatch,
  getState
) => {
  if (itemType === ItemTypes.PHOTO) {
    const img = getState().items[ItemTypes.PHOTO].find((t) => t.id === id);
    const result = dispatch(removeItem(id, itemType));
    if (img && img.url.startsWith("blob")) URL.revokeObjectURL(img.url);
    return result;
  } else dispatch(removeItem(id, itemType));
};

export const selectItem = (id, itemType) => ({
  type: ActionTypes.SELECT_ITEM,
  id,
  itemType,
});

function containsRope(ropes, node1, node2) {
  return ropes.some(
    (t) =>
      (t.node1 === node1 && t.node2 === node2) ||
      (t.node1 === node2 && t.node2 === node1)
  );
}

export const selectItemWithTool = (id, itemType) => (dispatch, getState) => {
  const state = getState();
  const selectedItem = state.items.selectedItem;
  switch (state.board.toolType) {
    case ToolTypes.REMOVE_TOOL:
      return dispatch(removeItemWithDisposal(id, itemType));

    case ToolTypes.TIE_ROPE_TOOL:
      if (itemType === ItemTypes.PIN) {
        if (
          selectedItem !== null &&
          selectedItem.itemType === ItemTypes.PIN &&
          selectedItem.id !== id
        ) {
          if (!containsRope(state.items[ItemTypes.ROPE], id, selectedItem.id))
            dispatch(addRope(id, selectedItem.id));
        }
        return dispatch(selectItem(id, itemType));
      }
      return;

    default:
      return;
  }
};

export const unselectItem = (id, itemType) => ({
  type: ActionTypes.UNSELECT_ITEM,
  id,
  itemType,
});
