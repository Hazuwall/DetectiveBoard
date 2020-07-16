import { ActionTypes } from "../constants/ActionTypes";
import { ItemTypes } from "../constants/ItemTypes";

function setSelection(items, id, isSelected) {
  return items.map((item) => (item.id === id ? { ...item, isSelected } : item));
}

export default function items(
  state = {
    selectedItem: null,
    [ItemTypes.PIN]: [],
    nodes: [],
    [ItemTypes.ROPE]: [],
    [ItemTypes.PHOTO]: [],
  },
  action
) {
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
            isSelected: false,
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
            isSelected: false,
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
            (t) => t.node1 !== action.id && t.node2 !== action.id
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
