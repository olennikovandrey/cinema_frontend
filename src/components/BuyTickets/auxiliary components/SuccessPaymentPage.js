import GoBack from "../../GoBack/GoBack";
import successImage from "../../../assets/images/buy-tickets/groot.png";
import { SET_IS_PAYMENT_SUCCESS } from "../../../store/actions/action-types";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const SuccessPaymentPage = () => {
  const emailForTickets = useSelector(state => state.emailForTickets);
  const dispatch = useDispatch();

  const clearIsPaymentSuccess = () => dispatch({ type: SET_IS_PAYMENT_SUCCESS, payload: false });

  return (
    <section className="success-page">
      <GoBack
        backValue="Вернуться на главную"
        backSteps={ "/" }
        additionalFn={ clearIsPaymentSuccess }
      />
      <div className="success-page__content">
        <img className="success-page__content-image" src={ successImage } alt="Groot" width="50%"/>
        <span className="success-page__content-message">Проверьте Вашу почту.<br/> Билеты отправлены на <br/>{ emailForTickets } </span>
      </div>
    </section>
  );
};

export default SuccessPaymentPage;
