import { ActionTypes } from "../constants/ActionTypes";
import { ItemTypes } from "../constants/ItemTypes";
import { ToolTypes } from "../constants/ToolTypes";

export const addPhotos = (urls, x, y) => ({
  type: ActionTypes.ADD_PHOTOS,
  urls,
  x,
  y,
});

export const uploadFiles = (files) => (dispatch, getState) => {
  if (files.length !== 0) {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith("image/")) {
        urls.push(window.URL.createObjectURL(files[i]));
      }
    }
    return dispatch(addPhotos(urls, 300, 300));
  }
};

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

export const addRope = (knot1, knot2) => ({
  type: ActionTypes.ADD_ROPE,
  knot1,
  knot2,
});

export const clearBoard = () => ({
  type: ActionTypes.CLEAR_BOARD,
});

export const clearBoardWithConfirmAndDisposal = () => (dispatch, getState) => {
  if (window.confirm("Do you want to clear the board?")) {
    const urls = getState().items[ItemTypes.PHOTO].map((t) => t.url);
    const result = dispatch(clearBoard());
    urls.forEach((url) => {
      if (url.startsWith("blob")) URL.revokeObjectURL(url);
    });
    return result;
  }
};

export const toggleTool = (toolType) => ({
  type: ActionTypes.TOGGLE_TOOL,
  toolType,
});

export const moveItem = (id, itemType, dx, dy) => ({
  type: ActionTypes.MOVE_ITEM,
  id,
  itemType,
  dx,
  dy,
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

export const updateKnot = (id, x, y) => ({
  type: ActionTypes.UPDATE_KNOT,
  id,
  x,
  y,
});

export const unselectItem = (id, itemType) => ({
  type: ActionTypes.UNSELECT_ITEM,
  id,
  itemType,
});
