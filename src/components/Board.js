import React from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import "./Board.css";
import { ItemTypes } from "../constants/ItemTypes";
import Pin from "./Pin";
import { moveItem, addPin } from "../actions";
import { ToolTypes } from "../constants/ToolTypes";

const mapStateToProps = (state) => {
  return { stateProps: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    boundMoveItem: (id, type, pos) => {
      dispatch(moveItem(id, type, pos.x, pos.y));
    },
    boundAddPin: (x, y) => {
      dispatch(addPin(x, y));
    },
  };
};

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ boundMoveItem, boundAddPin, stateProps }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.PIN,
    collect: (mon) => ({
      isOver: !!mon.isOver(),
    }),
    drop: (item, monitor) => {
      const { id, type } = monitor.getItem();
      const targetPos = monitor.getSourceClientOffset();
      boundMoveItem(id, type, targetPos);
    },
  });
  console.log("render");

  const handleClick = (e) => {
    if (stateProps.toolType === ToolTypes.ADD_PIN_TOOL) {
      boundAddPin(e.clientX, e.clientY);
    }
  };

  return (
    <div onClick={handleClick} ref={drop} className="board">
      {stateProps[ItemTypes.PIN].map((item) => {
        return <Pin key={item.id} id={item.id} x={item.x} y={item.y} />;
      })}
    </div>
  );
});

export default Board;
