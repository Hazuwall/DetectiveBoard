import { ActionTypes } from "../constants/ActionTypes";
import { ItemTypes } from "../constants/ItemTypes";
import { ToolTypes } from "../constants/ToolTypes";

const itemPermissionsPerTools = {
  [ToolTypes.ADD_PIN_TOOL]: {
    canSelect: [],
    canDrag: [],
  },
  [ToolTypes.MOVE_TOOL]: {
    canSelect: [],
    canDrag: [ItemTypes.PHOTO, ItemTypes.PIN],
  },
  [ToolTypes.REMOVE_TOOL]: {
    canSelect: [ItemTypes.PHOTO, ItemTypes.PIN, ItemTypes.ROPE],
    canDrag: [],
  },
  [ToolTypes.TIE_ROPE_TOOL]: {
    canSelect: [ItemTypes.PIN],
    canDrag: [ItemTypes.PHOTO, ItemTypes.PIN],
  },
};

export default function board(
  state = {
    toolType: ToolTypes.MOVE_TOOL,
    itemPermissions: itemPermissionsPerTools[ToolTypes.MOVE_TOOL],
  },
  action
) {
  switch (action.type) {
    case ActionTypes.ADD_IMAGES:
      return {
        ...state,
        toolType: ToolTypes.MOVE_TOOL,
        itemPermissions: itemPermissionsPerTools[ToolTypes.MOVE_TOOL],
      };

    case ActionTypes.TOGGLE_TOOL:
      const toolType =
        state.toolType === action.toolType
          ? ToolTypes.MOVE_TOOL
          : action.toolType;
      return {
        ...state,
        toolType,
        itemPermissions: itemPermissionsPerTools[toolType],
      };

    default:
      return state;
  }
}
