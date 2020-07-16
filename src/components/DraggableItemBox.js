import { useDrag } from "react-dnd";
import React from "react";
import PropTypes from "prop-types";
import "./DraggableItemBox.css";

const DraggableItemBox = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: props.itemType, id: props.id },
    canDrag: !!props.canDrag,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const result = monitor.getDropResult();
      if (result) {
        const delta = result.delta;
        props.onDrag(
          props.id,
          props.itemType,
          props.x + delta.x,
          props.y + delta.y
        );
      }
    },
  });

  const handleClick = (e) => {
    if (props.canSelect && props.onSelect) {
      props.onSelect(props.id, props.itemType);
      e.stopPropagation();
    }
  };

  let cursor;
  if (props.canSelect) cursor = "pointer";
  else if (props.canDrag) cursor = "move";
  else cursor = "auto";

  return (
    <div
      className="draggable-item-box"
      onClick={handleClick}
      style={{
        left: props.x,
        top: props.y,
        opacity: isDragging ? 0.5 : 1,
        cursor: cursor,
      }}
      ref={drag}
    >
      {props.children}
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
