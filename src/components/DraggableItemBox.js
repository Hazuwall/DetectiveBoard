import { useDrag } from "react-dnd";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { moveNode, applyPointerTool } from "../actions";
import "./DraggableItemBox.css";
import { ToolTypes, isPointerTool } from "../constants/ToolTypes";

const mapStateToProps = (state) => {
  return {
    canDrag: state.toolType === ToolTypes.MOVE_TOOL,
    isPointerToolActive: isPointerTool(state.toolType),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDrag: (...args) => {
      dispatch(moveNode(...args));
    },
    handleClick: (isPointerToolActive, ...args) => {
      if (isPointerToolActive) dispatch(applyPointerTool(...args));
    },
  };
};

const DraggableItemBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    id,
    itemType,
    x,
    y,
    canDrag,
    isPointerToolActive,
    handleDrag,
    handleClick,
    children,
  }) => {
    const [{ isDragging, initialPos, dragPos }, drag] = useDrag({
      item: { type: itemType, id },
      canDrag: () => canDrag,
      collect: (monitor) => ({
        dragPos: monitor.getSourceClientOffset(),
        isDragging: !!monitor.isDragging(),
        initialPos: monitor.getInitialSourceClientOffset(),
      }),
      end: (item, monitor) => {
        handleDrag(id, x, y);
      },
    });

    useEffect(() => {
      if (dragPos) handleDrag(id, dragPos.x, dragPos.y);
    }, [id, dragPos, handleDrag]);

    let cursor;
    if (canDrag) cursor = "move";
    else if (isPointerToolActive) cursor = "pointer";
    else cursor = "auto";

    return (
      <div
        className="draggable-item-box"
        onClick={() => handleClick(isPointerToolActive, id, itemType)}
        style={{
          left: x,
          top: y,
          opacity: isDragging ? 0.5 : 1,
          cursor: cursor,
        }}
        ref={drag}
      >
        {children}
      </div>
    );
  }
);

DraggableItemBox.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  itemType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DraggableItemBox;
