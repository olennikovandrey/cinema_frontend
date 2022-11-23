import React from "react";
import PropTypes from "prop-types";

const Select = ({ label, required = true, optionValues, defaultValue, stateFunc, width = "100%" }) => {
  return (
    <div className="admin-select" style={ { width: width } }>
      <label>{ label } { required && <b>*</b> }</label>
      <select
        defaultValue={ defaultValue }
        onChange={ e => stateFunc(e) }>
        {
          optionValues
            .map(({ _id, title, secondValue }) =>
              <option key={ _id }  value={ `${ _id } ${ secondValue ? secondValue : "" }` }>{ title }</option>
            )
        }
      </select>
    </div>
  );
};

export default Select;

Select.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  width: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  stateFunc: PropTypes.func,
  optionValues: PropTypes.array,
  sessions: PropTypes.array
};
