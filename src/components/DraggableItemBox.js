import { useDrag, DragPreviewImage } from "react-dnd";
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
  const [{ isDragging, relativeCursorOffset }, drag, preview] = useDrag({
    item: { type: itemType, id },
    canDrag: !!canDrag,
    collect: (monitor) => {
      const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
      const initialClientOffset = monitor.getInitialClientOffset();
      return {
        relativeCursorOffset: initialSourceClientOffset
          ? {
              x: initialClientOffset.x - initialSourceClientOffset.x,
              y: initialClientOffset.y - initialSourceClientOffset.y,
            }
          : null,
        isDragging: !!monitor.isDragging(),
      };
    },
  });

  const handleClick = (e) => {
    if (canSelect && onSelect) {
      onSelect(id, itemType);
      e.stopPropagation();
    }
  };

  const handleDrag = (e) => {
    const targetX = x + e.nativeEvent.offsetX - relativeCursorOffset.x;
    const targetY = y + e.nativeEvent.offsetY - relativeCursorOffset.y;
    if (targetX > 0 && targetY > 0) onDrag(id, itemType, targetX, targetY);
    else onDrag(id, itemType, x, y);
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
      onDrag={handleDrag}
    >
      <DragPreviewImage connect={preview} src="" />
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
