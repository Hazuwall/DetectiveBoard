import { useDrag, DragPreviewImage } from "react-dnd";
import React from "react";
import PropTypes from "prop-types";
import "./BoardItemBox.css";

const BoardItemBox = ({
  id,
  x,
  y,
  itemType,
  children,
  className,
  dragPreviewSrc,
  canDrag,
  canSelect,
  isSelected,
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
    //TODO: disable dragging while canDrag=false
    if (!!canDrag) {
      const targetX = x + e.nativeEvent.offsetX - relativeCursorOffset.x;
      const targetY = y + e.nativeEvent.offsetY - relativeCursorOffset.y;
      if (targetX > 0 && targetY > 0) onDrag(id, itemType, targetX, targetY);
      else onDrag(id, itemType, x, y);
    }
  };

  let modifier;
  if (isDragging) modifier = "board-item-box_dragging";
  else if (isSelected) modifier = "board-item-box_selected";
  else if (canSelect) modifier = "board-item-box_selectable";
  else if (canDrag) modifier = "board-item-box_draggable";
  else modifier = "board-item-box_disabled";

  return (
    <div
      className={["board-item-box", modifier, className].join(" ")}
      onClick={handleClick}
      style={{
        left: x,
        top: y,
      }}
      ref={drag}
      onDrag={handleDrag}
    >
      <DragPreviewImage connect={preview} src={dragPreviewSrc} />
      {children}
    </div>
  );
};

BoardItemBox.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  itemType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dragPreviewSrc: PropTypes.string,
  canDrag: PropTypes.bool,
  canSelect: PropTypes.bool,
  isSelected: PropTypes.bool,
  onDrag: PropTypes.func,
  onSelect: PropTypes.func,
};

BoardItemBox.defaultProps = {
  className: "",
  canDrag: true,
  canSelect: false,
  isSelected: false,
  onSelect: null,
  onDrag: null,
};

export default BoardItemBox;
