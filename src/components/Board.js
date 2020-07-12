import React from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import "./Board.css";
import { ItemTypes } from "../constants/ItemTypes";
import Pin from "./Pin";
import { moveItem, clickSpaceWithTool } from "../actions";
import Rope from "./Rope";

const mapStateToProps = (state) => {
  return { items: state.items };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDrop: (item, monitor) => {
      const { id, type } = monitor.getItem();
      const pos = monitor.getSourceClientOffset();
      dispatch(moveItem(id, type, pos.x, pos.y));
    },
    onClick: (e) => {
      dispatch(clickSpaceWithTool(e.clientX, e.clientY));
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
    accept: ItemTypes.PIN,
    drop: onDrop,
  });

  return (
    <div onClick={onClick} ref={drop} className="board">
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
              start={getNodePos(item.node1, items.nodes)}
              end={getNodePos(item.node2, items.nodes)}
            />
          );
        })}
      </svg>
      {items[ItemTypes.PIN].map((item) => {
        return (
          <Pin
            key={item.id}
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
