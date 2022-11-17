import RegisterFormItem from "./RegisterFormItem";
import { registerFetch } from "./registerForm.api";
import registerSchema from "../../validation/registerSchema.json";
import { validReset } from "../../services/services";
import { CHECK_IS_REGISTER_MODAL_OPEN, CHECK_IS_LOGIN_MODAL_OPEN, CHECK_IS_USER_AUTHORIZED } from "../../store/actions/action-types";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ajv from "ajv";

const RegisterForm = () => {
  const [user, setUser] = useState();
  const [requestMessage, setRequestMessage] = useState("");
  const passwordInputRef = useRef(null);

  const isRegisterModalOpen = useSelector(state => state.isRegisterModalOpen);
  const isLoginModalOpen = useSelector(state => state.isLoginModalOpen);
  const dispatch = useDispatch();

  const handleBlur = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(registerSchema);

    if (validate(user)) {
      validReset(["firstName", "email", "password"]);
      setRequestMessage("");
      try {
        const { message, token } = await registerFetch(user);

        if (message) setRequestMessage(message);
        if (token) {
          localStorage.setItem("cinema_token", token);
          dispatch({ type: CHECK_IS_LOGIN_MODAL_OPEN, payload: !isLoginModalOpen});
          dispatch({ type: CHECK_IS_REGISTER_MODAL_OPEN, payload: !isRegisterModalOpen });
          dispatch({ type: CHECK_IS_USER_AUTHORIZED });
          setRequestMessage("");
        }
      } catch (e) {
        setRequestMessage(e);
      }
    } else {
      validReset(["firstName", "email", "password"]);

      validate.errors !== null && validate.errors.forEach(item =>
        document.getElementById(`${ item.dataPath.slice(1) }`)
          .dataset.valid = "invalid"
      );
    }
  };

  return (
    <div className={ `register-form-wrapper ${ isRegisterModalOpen ? "visible" : "hidden" } ` }>
      <form
        className="register-form"
        autoComplete="off"
        onSubmit={ e => handleSubmit(e) }
      >
        <span className="register-form__title">Регистрация</span>
        <RegisterFormItem
          handleBlur={ e => handleBlur(e) }
          label="Имя пользователя"
          placeholder="Минимум 4 символа"
          name="firstName"
        />
        <RegisterFormItem
          handleBlur={ e => handleBlur(e) }
          label="Email"
          placeholder="example@mail.com"
          name="email"
        />
        <RegisterFormItem
          handleBlur={ e => handleBlur(e) }
          label="Пароль"
          placeholder="От 4 до 20 символов"
          name="password"
          type="password"
          ref={ passwordInputRef }
        />
        <span className="register-form__message-wrapper">
          { requestMessage && <span className="register-form__error">{ requestMessage }</span> }
        </span>
        <span
          className="close-button"
          onClick={ () => dispatch({ type: CHECK_IS_REGISTER_MODAL_OPEN, payload: !isRegisterModalOpen }) }
        ></span>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterForm;
