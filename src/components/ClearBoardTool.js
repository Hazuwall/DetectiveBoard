import { connect } from "react-redux";
import { clearBoardWithConfirmAndDisposal } from "../actions";
import Tool from "./Tool";

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch(clearBoardWithConfirmAndDisposal()),
  };
};

const ClearBoardTool = connect(null, mapDispatchToProps)(Tool);

export default ClearBoardTool;
