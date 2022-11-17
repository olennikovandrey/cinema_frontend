import { createMarkup } from "../../../services/services";
import React from "react";
import PropTypes from "prop-types";

const SingleEditableTextarea = ({ label, required = true, onBlur, value, additionalClassNames = [] }) => {
  const className = ["admin-item__input", ...additionalClassNames].join(" ");
  return <div className={ className }>
    <label>{ label } { required && <b>*</b> }</label>
    <div className="editable-textarea"
      onBlur={ e => onBlur(e) }
      dangerouslySetInnerHTML={ createMarkup(value) }
      contentEditable="true"
    />
  </div>;
};

const EditableTextareasList = ({ textareaConfigs, additionalClassNames = [] }) => {
  return textareaConfigs.map((config) => <SingleEditableTextarea key={ config.label } additionalClassNames={ additionalClassNames } { ...config } />);
};

const EditableTextarea = ({ textareaConfigs }) => {
  return (
    <>
      {
        textareaConfigs.length === 1
          ? <EditableTextareasList textareaConfigs={ textareaConfigs } />
          : <div className="inputs-group">
            <EditableTextareasList
              textareaConfigs={ textareaConfigs }
              additionalClassNames={ ["inputs-group__input"] }
            />
          </div>
      }
    </>
  );
};

export default EditableTextarea;

EditableTextarea.propTypes = {
  textareaConfigs: PropTypes.array
};

SingleEditableTextarea.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  additionalClassNames: PropTypes.array
};
