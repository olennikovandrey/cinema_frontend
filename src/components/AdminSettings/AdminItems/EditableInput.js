import { createMarkup } from "../../../services/services";
import React from "react";
import PropTypes from "prop-types";

const SingleEditableInput = ({ label, required = true, onBlur, value, name, additionalClassNames = [], valid = null }) => {
  const className = ["admin-item__input", ...additionalClassNames].join(" ");
  return <div className={ className }>
    <label>{ label } { required && <b>*</b> }</label>
    <span
      name={ name }
      onBlur={ onBlur }
      dangerouslySetInnerHTML={ createMarkup(value) }
      contentEditable="true"
      data-valid={ valid }
    />
  </div>;
};

const EditableInputList = ({ inputConfigs, additionalClassNames = [] }) => {
  return inputConfigs.map((config) => <SingleEditableInput key={ config.label } additionalClassNames={ additionalClassNames } { ...config } />);
};

const EditableInput = ({ inputConfigs }) => {
  return (
    <>
      {
        inputConfigs.length === 1
          ? <EditableInputList inputConfigs={ inputConfigs } />
          : <div className="inputs-group">
            <EditableInputList
              inputConfigs={ inputConfigs }
              additionalClassNames={ ["inputs-group__input"] }
            />
          </div>
      }
    </>
  );
};

export default EditableInput;

EditableInput.propTypes = {
  inputConfigs: PropTypes.array
};

SingleEditableInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  valid: PropTypes.string,
  additionalClassNames: PropTypes.array
};
