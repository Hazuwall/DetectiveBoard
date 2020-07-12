import { ActionTypes } from "../constants/ActionTypes";
import { ItemTypes } from "../constants/ItemTypes";

export default function items(
  state = {
    [ItemTypes.PIN]: [],
    nodes: [],
    [ItemTypes.ROPE]: [],
  },
  action
) {
  switch (action.type) {
    case ActionTypes.ADD_PIN:
      const pins = state[ItemTypes.PIN];
      const nodes = state.nodes;
      const id = pins.reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1;
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

    case ActionTypes.ADD_ROPE:
      const ropes = state[ItemTypes.ROPE];
      return {
        ...state,
        [ItemTypes.ROPE]: [
          ...ropes,
          {
            id: ropes.reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1,
            node1: action.node1,
            node2: action.node2,
          },
        ],
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

    case ActionTypes.REMOVE_ITEM:
      if (action.itemType === ItemTypes.PIN) {
        return {
          ...state,
          [action.itemType]: state[action.itemType].filter(
            (t) => t.id !== action.id
          ),
          nodes: state.nodes.filter((t) => t.id !== action.id),
          [ItemTypes.ROPE]: state[ItemTypes.ROPE].filter(
            (t) => t.startNodeId !== action.id && t.endNodeId !== action.id
          ),
        };
      } else {
        return {
          ...state,
          [action.itemType]: state[action.itemType].filter(
            (t) => t.id !== action.id
          ),
        };
      }

    default:
      return state;
  }
}
