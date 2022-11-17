import React from "react";
import PropTypes from "prop-types";

const Modal = ({ message, success, isModal }) => {
  return (
    <div className={ isModal ? "modal visible" : "modal hidden" }>
      <span className={ success ? "modal__success" : "modal__error" }></span>
      <p>{ message }</p>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  message: PropTypes.string,
  success: PropTypes.bool,
  isModal: PropTypes.bool
};
