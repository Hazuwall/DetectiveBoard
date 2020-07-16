import React from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import { ItemTypes } from "../constants/ItemTypes";
import { clickSpaceWithTool } from "../actions";
import "./Board.css";
import Pin from "./Pin";
import Rope from "./Rope";
import Photo from "./Photo";

const mapStateToProps = (state) => {
  return { items: state.items };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (e) => {
      dispatch(
        clickSpaceWithTool(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      );
    },
  };
};

const getNodePos = (id, nodes) => {
  const node = nodes.find((t) => t.id === id);
  return { x: node.x, y: node.y };
};

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ onDrop, onClick, items }) => {
  const [, drop] = useDrop({
    accept: [ItemTypes.PIN, ItemTypes.PHOTO],
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      return { delta };
    },
  });

  return (
    <div onClick={onClick} ref={drop} className="board">
      {items[ItemTypes.PHOTO].map((item) => {
        return (
          <Photo
            key={ItemTypes.PHOTO + item.id}
            id={item.id}
            x={item.x}
            y={item.y}
            url={item.url}
            isSelected={item.isSelected}
          />
        );
      })}
      <svg
        className="svg-container"
        viewBox="0 0 800 800"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {items[ItemTypes.ROPE].map((item) => {
          return (
            <Rope
              key={item.id}
              id={item.id}
              node1={getNodePos(item.node1, items.nodes)}
              node2={getNodePos(item.node2, items.nodes)}
              isSelected={item.isSelected}
            />
          );
        })}
      </svg>
      {items[ItemTypes.PIN].map((item) => {
        return (
          <Pin
            key={ItemTypes.PIN + item.id}
            id={item.id}
            x={item.x}
            y={item.y}
            isSelected={item.isSelected}
          />
        );
      })}
    </div>
  );
});

export default Board;
