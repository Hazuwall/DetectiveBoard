import { ItemTypes } from "../constants/ItemTypes";
import { useDrag } from "react-dnd";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { moveNode } from "../actions";
import "./DraggableItemBox.css";
import { ToolTypes } from "../constants/ToolTypes";

const mapStateToProps = (state) => {
  return { canDrag: state.toolType === ToolTypes.MOVE_TOOL };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDrag: (id, pos) => {
      dispatch(moveNode(id, pos.x, pos.y));
    },
  };
};

const DraggableItemBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ id, pos, canDrag, handleDrag, children }) => {
  const [{ isDragging, initialPos, dragPos }, drag] = useDrag({
    item: { type: ItemTypes.PIN, id },
    canDrag: () => canDrag,
    collect: (monitor) => ({
      dragPos: monitor.getSourceClientOffset(),
      isDragging: !!monitor.isDragging(),
      initialPos: monitor.getInitialSourceClientOffset(),
    }),
    end: (item, monitor) => {
      handleDrag(id, pos);
    },
  });

  useEffect(() => {
    if (dragPos) handleDrag(0, dragPos);
  }, [dragPos, handleDrag]);

  return (
    <div
      className="draggable-item-box"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: isDragging ? 0.5 : 1,
        cursor: canDrag ? "move" : "auto",
      }}
      ref={drag}
    >
      {children}
    </div>
  );
});

DraggableItemBox.propTypes = {
  id: PropTypes.number.isRequired,
  pos: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default DraggableItemBox;
