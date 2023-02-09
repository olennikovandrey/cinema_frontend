import React from "react";
import PropTypes from "prop-types";

const SingleInput = ({ label, required = true, onBlur, placeholder, additionalClassNames = [], inputType = "text", valid = null, onChangeRegEx = null, isValidChecker }) => {
  const className = ["admin-item__input", ...additionalClassNames].join(" ");

  return <div className={ className }>
    <label>{ label } { required && <b>*</b> }</label>
    <input
      type={ inputType }
      onBlur={ onBlur }
      placeholder={ placeholder }
      data-valid={ valid }
      onChange={ isValidChecker ? e => isValidChecker(e, onChangeRegEx, valid) : null}
    />
  </div>;
};

const InputList = ({ inputConfigs, additionalClassNames = [] }) => {
  return inputConfigs.map((config) => <SingleInput key={ config.label } additionalClassNames={ additionalClassNames } { ...config } />);
};

const Input = ({ inputConfigs }) => {
  return (
    <>
      {
        inputConfigs.length === 1 ?
          <InputList inputConfigs={ inputConfigs } /> :
          <div className="inputs-group">
            <InputList
              inputConfigs={ inputConfigs }
              additionalClassNames={ ["inputs-group__input"] }
            />
          </div>
      }
    </>
  );
};

export default Input;

Input.propTypes = {
  inputConfigs: PropTypes.array
};

SingleInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  valid: PropTypes.string,
  onChangeRegEx: PropTypes.string,
  isValidChecker: PropTypes.func,
  additionalClassNames: PropTypes.array
};
