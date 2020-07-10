import { ActionTypes } from "../constants/ActionTypes";
import { ItemTypes } from "../constants/ItemTypes";

export default function reducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_PIN:
      return [
        ...state,
        {
          id: state.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1,
          type: ItemTypes.PIN,
          left: action.left,
          top: action.top,
        },
      ];

    case ActionTypes.MOVE_ITEM:
      return state.map((item) =>
        item.id === action.id
          ? { ...item, left: action.left, top: action.top }
          : item
      );

    default:
      return state;
  }
}
