import { showPassword } from "../../services/services";
import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const RegisterFormItem = forwardRef((props, ref) => {
  const { handleBlur, label, placeholder, type = "text", name } = props;

  return (
    <div className="register-form__item">
      <label className="register-form__label">
        { label } <b>*</b>
        <input
          placeholder={ placeholder }
          type={ type }
          id={ name }
          data-valid=""
          name={ name }
          autoComplete="off"
          onBlur={ e => handleBlur(e) }
          ref={ ref }
        />
        { type === "password" &&
          <span className="show-password" onClick={ () => showPassword(ref) }></span>
        }
      </label>
    </div>
  );
});

RegisterFormItem.displayName = "RegisterFormItem";
export default RegisterFormItem;

RegisterFormItem.propTypes = {
  handleBlur: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string
};
