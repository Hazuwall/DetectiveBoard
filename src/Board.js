import React from "react";
import { useDrop } from "react-dnd";
import "./Board.css";
import Toolbox from "./Toolbox";
import { ItemTypes } from "./Constants";

function Board() {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.PIN,
    collect: (mon) => ({
      isOver: !!mon.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        opacity: isOver ? 0.5 : 1,
      }}
      className="board"
    >
      <Toolbox />
    </div>
  );
}

export default Board;
