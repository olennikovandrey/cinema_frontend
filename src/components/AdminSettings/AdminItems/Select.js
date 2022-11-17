import React from "react";
import PropTypes from "prop-types";

const Select = ({ label, required = true, name, optionValues, defaultValue, stateFunc, width = "100%" }) => {
  return (
    <div className="admin-select" style={ { width: width } }>
      <label>{ label } { required && <b>*</b> }</label>
      <select
        defaultValue={ defaultValue }
        name={ name }
        onChange={ e => { stateFunc(e); }}>
        {
          optionValues
            .map(item =>
              <option key={ item.title } value={ item._id }>{ item.title }</option>
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
  optionValues: PropTypes.array
};
