import { ActionTypes } from "../constants/ActionTypes";
import { ItemTypes } from "../constants/ItemTypes";
import { ToolTypes } from "../constants/ToolTypes";

function pointerToolReducer(state, action) {
  switch (state.toolType) {
    case ToolTypes.REMOVE_TOOL:
      const nodes =
        action.itemType === ItemTypes.PIN
          ? state.nodes.filter((t) => t.id !== action.id)
          : state.nodes;
      return {
        ...state,
        [action.itemType]: state[action.itemType].filter(
          (t) => t.id !== action.id
        ),
        nodes,
      };

    default:
      return state;
  }
}

export default function reducer(
  state = {
    toolType: ToolTypes.MOVE_TOOL,
    [ItemTypes.PIN]: [],
    nodes: [],
  },
  action
) {
  console.log(action);
  switch (action.type) {
    case ActionTypes.ADD_PIN:
      const pins = state[ItemTypes.PIN];
      const nodes = state.nodes;
      const id = pins.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1;
      return {
        ...state,
        [ItemTypes.PIN]: [
          ...pins,
          {
            id,
            x: action.x,
            y: action.y,
          },
        ],
        nodes: [
          ...nodes,
          {
            id,
            x: action.x,
            y: action.y,
          },
        ],
      };

    case ActionTypes.APPLY_POINTER_TOOL:
      return pointerToolReducer(state, action);

    case ActionTypes.TOGGLE_TOOL:
      return {
        ...state,
        toolType:
          state.toolType === action.toolType
            ? ToolTypes.NO_TOOL
            : action.toolType,
      };

    case ActionTypes.MOVE_ITEM:
      return {
        ...state,
        [action.itemType]: state[action.itemType].map((item) =>
          item.id === action.id ? { ...item, x: action.x, y: action.y } : item
        ),
      };

    case ActionTypes.MOVE_NODE:
      return {
        ...state,
        nodes: state.nodes.map((item) =>
          item.id === action.id ? { ...item, x: action.x, y: action.y } : item
        ),
      };

    default:
      return state;
  }
}
