import { useDrag } from "react-dnd";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { moveNode, selectItemWithTool } from "../actions";
import "./DraggableItemBox.css";
import { isSelectTool } from "../constants/ToolTypes";

const mapStateToProps = (state) => {
  return {
    canSelect: isSelectTool(state.board.toolType),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDrag: (id, x, y) => {
      dispatch(moveNode(id, x, y));
    },
    onSelect: (itemType, id) => {
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
        onDrag(id, x, y);
      },
    });

    const handleClick = (e) => {
      onSelect(itemType, id);
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
          backgroundColor: isSelected ? "red" : "white",
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
