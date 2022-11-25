import { CHECK_IS_EMAIL_MODAL_OPEN } from "../../../store/actions/action-types";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const EmailModal = () => {
  const [emailForTickets, setEmailForTickets] = useState("");
  const isEmailModalOpen = useSelector(state => state.isEmailModalOpen);
  const dispatch = useDispatch();
  const inputForEmailRef = useRef(null);
  const emailRegExp = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");

  const handleClick = () => {
    dispatch({ type: CHECK_IS_EMAIL_MODAL_OPEN, payload: false });
    document.querySelector(".fake-link").firstChild.click();

    /*     if (emailRegExp.test(emailForTickets)) {
      inputForEmailRef.current.dataset.valid = "";
      dispatch({ type: CHECK_IS_EMAIL_MODAL_OPEN, payload: false });
      document.querySelector(".fake-link").firstChild.click();
    } else {
      inputForEmailRef.current.dataset.valid = "invalid";
    } */
  };

  return (
    <>
      {
        isEmailModalOpen &&
        <div className="email-modal">
          <span className="close-button" onClick={ () => dispatch({ type: CHECK_IS_EMAIL_MODAL_OPEN, payload: false }) }></span>
          <span>Приобретенные Вами билеты будут отправлены на электронный адрес:</span>
          <input
            ref={ inputForEmailRef }
            className="email-modal__input"
            value={ emailForTickets }
            type="email"
            placeholder="example@mail.com"
            onChange={ e => setEmailForTickets(e.target.value) }
            data-valid=""
          />
          <button className="button-pink" onClick={ () => handleClick() }>Подтвердить</button>
        </div>
      }
    </>

  );
};

export default EmailModal;
