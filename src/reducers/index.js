import { ActionTypes } from "../constants/ActionTypes";
import { ItemTypes } from "../constants/ItemTypes";

export default function reducer(
  state = {
    [ItemTypes.PIN]: [
      {
        id: 0,
        x: 200,
        y: 200,
      },
    ],
    nodes: [
      {
        id: 0,
        x: 200,
        y: 200,
      },
    ],
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
