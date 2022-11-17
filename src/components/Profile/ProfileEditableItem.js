import { createMarkup } from "../../services/services";
import React from "react";
import PropTypes from "prop-types";

const ProfileEditableItem = ({ label, markupValue, handleBlur, name }) => {
  return (
    <div className="profile-field">
      <label className="profile-field__label">{ label }</label>
      <span
        className="profile-field__input"
        dangerouslySetInnerHTML={ createMarkup(markupValue) }
        contentEditable="true"
        onBlur={ e => handleBlur(e) }
        name={ name }
      ></span>
    </div>
  );
};

export default ProfileEditableItem;

ProfileEditableItem.propTypes = {
  handleBlur: PropTypes.func,
  markupValue: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string
};
