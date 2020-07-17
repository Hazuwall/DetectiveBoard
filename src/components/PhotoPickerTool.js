import React, { useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uploadFiles } from "../actions";
import Tool from "./Tool";

const mapDispatchToProps = (dispatch) => {
  return {
    onUpload: (files) => {
      dispatch(uploadFiles(files));
    },
  };
};

const ImagePickerTool = connect(
  null,
  mapDispatchToProps
)(({ onUpload, text }) => {
  const filePickerEl = useRef(null);

  const handleClick = (e) => {
    filePickerEl.current.click();
  };
  const handleUpload = (e) => {
    onUpload(e.target.files);
    e.target.value = "";
  };
  return (
    <>
      <input
        ref={filePickerEl}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
      />
      <Tool text={text} onClick={handleClick} />
    </>
  );
});

ImagePickerTool.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ImagePickerTool;
