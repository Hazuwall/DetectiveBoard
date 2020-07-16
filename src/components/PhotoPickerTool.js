import React, { useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPhotos } from "../actions";
import Tool from "./Tool";

const mapDispatchToProps = (dispatch) => {
  return {
    onUpload: (urls) => {
      dispatch(addPhotos(urls));
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
    let files = e.target.files;
    if (files.length !== 0) {
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.startsWith("image/")) {
          urls.push(window.URL.createObjectURL(files[i]));
        }
      }
      e.target.value = "";
      onUpload(urls);
    }
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
