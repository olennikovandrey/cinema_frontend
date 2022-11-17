import React from "react";
import PropTypes from "prop-types";

const ProfileInput = ({ label, handleBlur, name }) => {
  return (
    <div className="profile-field">
      <label className="profile-field__label">{ label }</label>
      <input
        name={ name }
        onBlur={ e => handleBlur(e) } />
    </div>

  );
};

export default ProfileInput;

ProfileInput.propTypes = {
  handleBlur: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string
};
