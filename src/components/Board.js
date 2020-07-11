import React from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import "./Board.css";
import Toolbar from "./Toolbar";
import { ItemTypes } from "../constants/ItemTypes";
import Pin from "./Pin";
import { moveItem } from "../actions";

const mapStateToProps = (state) => {
  return {
    pins: state[ItemTypes.PIN],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDrop: (id, type, pos) => {
      dispatch(moveItem(id, type, pos.x, pos.y));
    },
  };
};

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ onDrop, pins }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.PIN,
    collect: (mon) => ({
      isOver: !!mon.isOver(),
    }),
    drop: (item, monitor) => {
      const { id, type } = monitor.getItem();
      const targetPos = monitor.getSourceClientOffset();
      onDrop(id, type, targetPos);
    },
  });
  console.log("render");

  return (
    <div ref={drop} className="board">
      {pins.map((item) => {
        return (
          <Pin id={item.id} key={item.id} pos={{ x: item.x, y: item.y }} />
        );
      })}
    </div>
  );
});

export default Board;
