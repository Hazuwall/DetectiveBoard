import React from "react";
import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import "./Board.css";
import { ItemTypes } from "../constants/ItemTypes";
import Pin from "./Pin";
import { moveItem, addPin } from "../actions";
import { ToolbarModes } from "../constants/ToolbarModes";

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
    if (stateProps.toolbarMode === ToolbarModes.ADD_PIN_MODE) {
      boundAddPin(e.clientX, e.clientY);
    }
  };

  return (
    <div onClick={handleClick} ref={drop} className="board">
      {stateProps[ItemTypes.PIN].map((item) => {
        return (
          <Pin id={item.id} key={item.id} pos={{ x: item.x, y: item.y }} />
        );
      })}
    </div>
  );
});

export default Board;
