import React from "react";
import classes from "./VerifyModal.module.css";

function Modal(props) {
  return (
    <div>
      {/* Modal */}
      <div
        className={`${classes["md-modal"]} ${
          props.visible && classes["md-show"]
        }`}
      >
        <span>Are you sure you want to delete it?</span>
        <button onClick={props.onConfirm}>I am sure</button>
        <button onClick={props.onCancel}>Cancel</button>
      </div>
      <div className={classes["md-overlay"]} />
    </div>
  );
}

export default Modal;
