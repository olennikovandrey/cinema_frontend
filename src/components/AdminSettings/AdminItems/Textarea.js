import React from "react";
import PropTypes from "prop-types";

const Textarea = ({ label, required = true, placeholder, onBlur, valid = null }) => {
  return (
    <div className="admin-item__input">
      <label>{ label } { required && <b>*</b> }</label>
      <textarea
        placeholder={ placeholder }
        onBlur={ onBlur }
        data-valid={ valid }
      />
    </div>
  );
};

export default Textarea;

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  valid: PropTypes.string,
  required: PropTypes.bool,
  onBlur: PropTypes.func
};
