import { ActionTypes } from "../constants/ActionTypes";
import { ToolTypes } from "../constants/ToolTypes";

export default function board(
  state = {
    toolType: ToolTypes.MOVE_TOOL,
  },
  action
) {
  switch (action.type) {
    case ActionTypes.TOGGLE_TOOL:
      return {
        ...state,
        toolType:
          state.toolType === action.toolType
            ? ToolTypes.MOVE_TOOL
            : action.toolType,
      };

    default:
      return state;
  }
}
