import React from "react";
import PropTypes from "prop-types";

const Textarea = ({ label, required = true, placeholder, onBlur }) => {
  return (
    <div className="admin-item__input">
      <label>{ label } { required && <b>*</b> }</label>
      <textarea
        placeholder={ placeholder }
        onBlur={ onBlur }
      />
    </div>
  );
};

export default Textarea;

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onBlur: PropTypes.func
};
