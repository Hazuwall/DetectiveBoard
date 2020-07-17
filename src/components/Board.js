import React from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import { ItemTypes } from "../constants/ItemTypes";
import {
  moveItem,
  moveNode,
  selectItemWithTool,
  clickSpaceWithTool,
} from "../actions";
import "./Board.css";
import Pin from "./Pin";
import Rope from "./Rope";
import Photo from "./Photo";

const mapStateToProps = (state) => {
  return { items: state.items, itemPermissions: state.board.itemPermissions };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (e) => {
      dispatch(
        clickSpaceWithTool(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      );
    },
    onItemDrag: (id, itemType, x, y) => {
      dispatch(moveItem(id, itemType, x, y));
      if (itemType === ItemTypes.PIN) dispatch(moveNode(id, x, y));
    },
    onItemSelect: (id, itemType) => {
      dispatch(selectItemWithTool(id, itemType));
    },
  };
};

const createElements = (itemType, items, itemPermissions, onDrag, onSelect) => {
  if (itemType === ItemTypes.ROPE) {
    const canSelect = itemPermissions.canSelect.includes(itemType);
    return items[itemType].map((props) =>
      React.createElement(
        Rope,
        {
          ...props,
          key: props.id,
          node1: getNodePos(props.node1, items.nodes),
          node2: getNodePos(props.node2, items.nodes),
          canSelect,
          onSelect,
        },
        null
      )
    );
  } else {
    const canSelect = itemPermissions.canSelect.includes(itemType);
    const canDrag = itemPermissions.canDrag.includes(itemType);
    const componentType = itemType === ItemTypes.PIN ? Pin : Photo;
    return items[itemType].map((props) =>
      React.createElement(
        componentType,
        {
          ...props,
          key: props.id + itemType,
          canSelect,
          canDrag,
          onSelect,
          onDrag,
        },
        null
      )
    );
  }
};

const getNodePos = (id, nodes) => {
  const node = nodes.find((t) => t.id === id);
  return { x: node.x, y: node.y };
};

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ onDrop, onClick, onItemDrag, onItemSelect, items, itemPermissions }) => {
  const [, drop] = useDrop({
    accept: [ItemTypes.PIN, ItemTypes.PHOTO],
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      return { delta };
    },
  });

  return (
    <div onClick={onClick} ref={drop} className="board">
      {createElements(
        ItemTypes.PHOTO,
        items,
        itemPermissions,
        onItemDrag,
        onItemSelect
      )}
      <svg
        className="svg-container"
        viewBox="0 0 800 800"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {createElements(
          ItemTypes.ROPE,
          items,
          itemPermissions,
          onItemDrag,
          onItemSelect
        )}
      </svg>
      {createElements(
        ItemTypes.PIN,
        items,
        itemPermissions,
        onItemDrag,
        onItemSelect
      )}
    </div>
  );
});

export default Board;
