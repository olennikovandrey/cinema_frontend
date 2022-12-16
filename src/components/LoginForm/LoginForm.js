import { loginFetch } from "./loginForm.api";
import loginSchema from "../../validation/loginSchema.json";
import { validReset, showPassword } from "../../services/services";
import { CHECK_IS_LOGIN_MODAL_OPEN, CHECK_IS_REGISTER_MODAL_OPEN, CHECK_IS_USER_AUTHORIZED, CHECK_IS_USER_ADMIN, SET_USER_PERSONAL_DATA } from "../../store/actions/action-types";
import { userRole } from "../../constants/constants";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ajv from "ajv";

const LoginForm = () => {
  const [user, setUser] = useState({});
  const [requestMessage, setRequestMessage] = useState("");
  const passwordInputRef = useRef(null);
  const isLoginModalOpen = useSelector(state => state.isLoginModalOpen);
  const dispatch = useDispatch();

  const handleSubmmit = async e => {
    e.preventDefault();
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(loginSchema);

    if (validate(user)) {
      validReset(["loginemail", "loginpassword"]);
      try {
        const { message, token, userType } = await loginFetch(user);
        if (message) setRequestMessage(message);
        if (token) {
          localStorage.setItem("cinema_token", token);
          userType === userRole.admin && dispatch({ type: CHECK_IS_USER_ADMIN });
          dispatch({ type: CHECK_IS_LOGIN_MODAL_OPEN, payload: !isLoginModalOpen });
          dispatch({ type: CHECK_IS_USER_AUTHORIZED });
          dispatch({ type: SET_USER_PERSONAL_DATA, payload: user });
          setRequestMessage("");
        }
      } catch (e) {
        setRequestMessage(e);
      }
    } else {
      validReset(["loginemail", "loginpassword"]);

      validate.errors !== null && validate.errors.forEach(item =>
        document.getElementById(`login${ item.dataPath.slice(1) }`)
          .dataset.valid = "invalid"
      );
    }
  };

  return (
    <div className={ `login-form-wrapper ${ isLoginModalOpen ? "visible" : "hidden" }` }>
      <form
        className="login-form"
        onSubmit={ e => handleSubmmit(e) }>
        <div className="login-form__item">
          <label className="login-form__label">
            Логин
            <input
              placeholder="example@mail.com"
              type="text"
              id="loginemail"
              data-valid=""
              data-existing={ requestMessage }
              onChange={ e => setUser( { ...user, email: e.target.value }) }
            />
          </label>
        </div>
        <div className="login-form__item">
          <label className="login-form__label">
            Пароль
            <input
              placeholder="От 4 до 20 символов"
              type="password"
              id="loginpassword"
              ref={ passwordInputRef }
              data-valid=""
              onChange={ e => setUser( { ...user, password: e.target.value }) }
            />
            <span className="show-password" onClick={ () => showPassword(passwordInputRef)}></span>
          </label>
        </div>
        <span className="login-form__message-wrapper">
          { requestMessage && <span className="login-form__error">{ requestMessage }</span>
          }
        </span>
        <button type="submit">Войти</button>
        <span
          className="close-button"
          onClick={ () => dispatch({ type: CHECK_IS_LOGIN_MODAL_OPEN, payload: false }) }
        ></span>
        <button
          type="button"
          onClick={ () => dispatch({ type: CHECK_IS_REGISTER_MODAL_OPEN, payload: true }) }
        >Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default LoginForm;
