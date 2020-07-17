import React from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import { ItemTypes } from "../constants/ItemTypes";
import {
  uploadFiles,
  moveItem,
  updateKnot,
  selectItemWithTool,
  clickSpaceWithTool,
} from "../actions";
import "./Board.css";
import Pin from "./Pin";
import Rope from "./Rope";
import Photo from "./Photo";
import { NativeTypes } from "react-dnd-html5-backend";

const mapStateToProps = (state) => {
  return { items: state.items, itemPermissions: state.board.itemPermissions };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (x, y) => {
      dispatch(clickSpaceWithTool(x, y));
    },
    onUpload: (files) => {
      dispatch(uploadFiles(files));
    },
    onItemDrag: (id, itemType, x, y) => {
      if (itemType === ItemTypes.PIN) dispatch(updateKnot(id, x, y));
    },
    onItemDragAndDrop: (id, itemType, dx, dy) => {
      dispatch(moveItem(id, itemType, dx, dy));
    },
    onItemSelect: (id, itemType) => {
      dispatch(selectItemWithTool(id, itemType));
    },
  };
};

const getKnotPos = (id, knots) => {
  const knot = knots.find((t) => t.id === id);
  return { x: knot.x, y: knot.y };
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
          knot1: getKnotPos(props.knot1, items.knots),
          knot2: getKnotPos(props.knot2, items.knots),
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

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    items,
    itemPermissions,
    onUpload,
    onClick,
    onItemDrag,
    onItemDragAndDrop,
    onItemSelect,
  }) => {
    const [, drop] = useDrop({
      accept: [ItemTypes.PIN, ItemTypes.PHOTO, NativeTypes.FILE],
      drop: (item, monitor) => {
        if (!item.type || item.type === NativeTypes.FILE) {
          onUpload(item.files);
        } else {
          const delta = monitor.getDifferenceFromInitialOffset();
          onItemDragAndDrop(item.id, item.type, delta.x, delta.y);
        }
      },
    });

    return (
      <div
        onClick={(e) => onClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
        ref={drop}
        className="board"
      >
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
  }
);

export default Board;
