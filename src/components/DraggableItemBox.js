import { useDrag } from "react-dnd";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { moveItem, moveNode, selectItemWithTool } from "../actions";
import "./DraggableItemBox.css";
import { isSelectTool } from "../constants/ToolTypes";

const mapStateToProps = (state) => {
  return {
    canSelect: isSelectTool(state.board.toolType),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDrag: (id, itemType, x, y) => {
      dispatch(moveItem(id, itemType, x, y));
      dispatch(moveNode(id, x, y));
    },
    onSelect: (id, itemType) => {
      dispatch(selectItemWithTool(id, itemType));
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
    isSelected,
    canSelect,
    onDrag,
    onSelect,
    children,
  }) => {
    const [{ isDragging }, drag] = useDrag({
      item: { type: itemType, id },
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
      onSelect(id, itemType);
      e.stopPropagation();
    };

    return (
      <div
        className="draggable-item-box"
        onClick={handleClick}
        style={{
          left: x,
          top: y,
          opacity: isDragging ? 0.5 : 1,
          cursor: canSelect ? "pointer" : "move",
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
  isSelected: PropTypes.bool.isRequired,
  itemType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DraggableItemBox;
