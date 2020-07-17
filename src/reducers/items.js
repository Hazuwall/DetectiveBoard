import { ActionTypes } from "../constants/ActionTypes";
import { ItemTypes } from "../constants/ItemTypes";

const emptyState = {
  selectedItem: null,
  [ItemTypes.PIN]: [],
  knots: [],
  [ItemTypes.ROPE]: [],
  [ItemTypes.PHOTO]: [],
};

function setSelection(items, id, isSelected) {
  return items.map((item) => (item.id === id ? { ...item, isSelected } : item));
}

export default function items(state = emptyState, action) {
  switch (action.type) {
    case ActionTypes.ADD_PHOTOS: {
      const images = state[ItemTypes.PHOTO];
      let id = images.reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1;
      let x = action.x;
      let y = action.y;
      const newImages = action.urls.map((url) => {
        const image = { id, x, y, url, isSelected: false };
        id++;
        x += 20;
        y += 20;
        return image;
      });

      return {
        ...state,
        [ItemTypes.PHOTO]: images.concat(newImages),
      };
    }

    case ActionTypes.ADD_PIN:
      const pins = state[ItemTypes.PIN];
      const knots = state.knots;
      const id = pins.reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1;
      return {
        ...state,
        [ItemTypes.PIN]: [
          ...pins,
          {
            id,
            x: action.x,
            y: action.y,
            isSelected: false,
          },
        ],
        knots: [
          ...knots,
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
            knot1: action.knot1,
            knot2: action.knot2,
            isSelected: false,
          },
        ],
      };

    case ActionTypes.CLEAR_BOARD:
      return emptyState;

    case ActionTypes.MOVE_ITEM:
      if (action.itemType === ItemTypes.PIN) {
        let { x, y } = state[action.itemType].find((t) => t.id === action.id);
        x += action.dx;
        y += action.dy;
        return {
          ...state,
          [action.itemType]: state[action.itemType].map((t) =>
            t.id === action.id ? { ...t, x, y } : t
          ),
          knots: state.knots.map((t) =>
            t.id === action.id ? { ...t, x, y } : t
          ),
        };
      }
      return {
        ...state,
        [action.itemType]: state[action.itemType].map((t) =>
          t.id === action.id
            ? { ...t, x: t.x + action.dx, y: t.y + action.dy }
            : t
        ),
      };

    case ActionTypes.REMOVE_ITEM:
      if (action.itemType === ItemTypes.PIN) {
        return {
          ...state,
          [action.itemType]: state[action.itemType].filter(
            (t) => t.id !== action.id
          ),
          knots: state.knots.filter((t) => t.id !== action.id),
          [ItemTypes.ROPE]: state[ItemTypes.ROPE].filter(
            (t) => t.knot1 !== action.id && t.knot2 !== action.id
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

    case ActionTypes.SELECT_ITEM: {
      const selectedItem = {
        id: action.id,
        itemType: action.itemType,
      };
      const oldSelectedItem = state.selectedItem;
      if (oldSelectedItem !== null) {
        const unselectedList = setSelection(
          state[oldSelectedItem.itemType],
          oldSelectedItem.id,
          false
        );
        if (oldSelectedItem.itemType === action.itemType) {
          return {
            ...state,
            selectedItem,
            [action.itemType]: setSelection(unselectedList, action.id, true),
          };
        } else {
          return {
            ...state,
            selectedItem,
            [action.itemType]: setSelection(
              state[action.itemType],
              action.id,
              true
            ),
            [state.selectedItem.itemType]: unselectedList,
          };
        }
      } else
        return {
          ...state,
          selectedItem,
          [action.itemType]: setSelection(
            state[action.itemType],
            action.id,
            true
          ),
        };
    }

    // TODO: skip intermediate idempotent actions
    case ActionTypes.UPDATE_KNOT:
      return {
        ...state,
        knots: state.knots.map((item) =>
          item.id === action.id ? { ...item, x: action.x, y: action.y } : item
        ),
      };

    case ActionTypes.UNSELECT_ITEM:
    case ActionTypes.TOGGLE_TOOL: {
      const oldSelectedItem = state.selectedItem;
      if (state.selectedItem === null) {
        return state;
      } else {
        return {
          ...state,
          selectedItem: null,
          [oldSelectedItem.itemType]: setSelection(
            state[oldSelectedItem.itemType],
            oldSelectedItem.id,
            false
          ),
        };
      }
    }

    default:
      return state;
  }
}
