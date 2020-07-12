import { ActionTypes } from "../constants/ActionTypes";
import { ToolTypes } from "../constants/ToolTypes";

export default function board(
  state = {
    toolType: ToolTypes.MOVE_TOOL,
    selectedItem: null,
  },
  action
) {
  switch (action.type) {
    case ActionTypes.TOGGLE_TOOL:
      return {
        ...state,
        selectedItem: null,
        toolType:
          state.toolType === action.toolType
            ? ToolTypes.MOVE_TOOL
            : action.toolType,
      };

    case ActionTypes.SELECT_ITEM:
      return {
        ...state,
        selectedItem: {
          id: action.id,
          itemType: action.itemType,
        },
      };

    case ActionTypes.UNSELECT_ITEM:
      return {
        ...state,
        selectedItem: null,
      };

    default:
      return state;
  }
}
