import { useDrag } from "react-dnd";
import React from "react";
import PropTypes from "prop-types";
import "./DraggableItemBox.css";

const DraggableItemBox = ({
  id,
  x,
  y,
  itemType,
  children,
  canDrag,
  canSelect,
  onDrag,
  onSelect,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: itemType, id },
    canDrag: !!canDrag,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const result = monitor.getDropResult();
      if (result) {
        const delta = result.delta;
        onDrag(id, itemType, x + delta.x, y + delta.y);
      }
    },
  });

  const handleClick = (e) => {
    if (canSelect && onSelect) {
      onSelect(id, itemType);
      e.stopPropagation();
    }
  };

  let modifier;
  if (isDragging) modifier = "draggable-item-box_dragging";
  else {
    if (canSelect) modifier = "draggable-item-box_selectable";
    else if (canDrag) modifier = "draggable-item-box_active";
    else modifier = "draggable-item-box_disabled";
  }

  return (
    <div
      className={"draggable-item-box " + modifier}
      onClick={handleClick}
      style={{
        left: x,
        top: y,
      }}
      ref={drag}
    >
      {children}
    </div>
  );
};

DraggableItemBox.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  itemType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  canDrag: PropTypes.bool,
  canSelect: PropTypes.bool,
  onDrag: PropTypes.func,
  onSelect: PropTypes.func,
};

DraggableItemBox.defaultProps = {
  canDrag: true,
  canSelect: false,
  onSelect: null,
  onDrag: null,
};

export default DraggableItemBox;
