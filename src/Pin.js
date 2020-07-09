import { ItemTypes } from "./Constants";
import { useDrag } from "react-dnd";
import React from "react";

function Pin() {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PIN },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <img className="slot-img" src="pin.png" alt="Push Pin" />
    </div>
  );
}

export default Pin;
