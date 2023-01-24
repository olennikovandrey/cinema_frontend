import { buyTicketsFetch, occupySeatsFetch } from "../buyTickets.api";
import { getTotalPrice } from "../../../services/services";
import { CLEAR_SEATS_AFTER_BUY, CHECK_IS_LOADER_OPEN, SET_IS_PAYMENT_SUCCESS } from "../../../store/actions/action-types";
import React, { useMemo, useState } from "react";
import { useElements, useStripe, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";

const PaymentForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const selectedSeats = useSelector(state => state.selectedSeats);
  const userEmail = useSelector(state => state.userData.email);
  const emailForTickets = useSelector(state => state.emailForTickets);
  const currentSessionId = useSelector(state => state.userData.currentSessionId);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const useOptions = () => {
    const options = useMemo(
      () => ({
        style: {
          base: {
            color: "#ffffff",
            letterSpacing: "0.2em",
            fontFamily: ", sans-serif",
            fontSize: "20px",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#9e2146"
          }
        }
      }),
      []
    );
    return options;
  };
  const options = useOptions();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    const cardElement = elements.getElement(CardNumberElement);
    const seatsToBuy = selectedSeats.filter(item => item.sessionId === currentSessionId);
    const totalPrice = getTotalPrice(seatsToBuy);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement
    });

    const errorHandler = () => {
      dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
      dispatch({ type: SET_IS_PAYMENT_SUCCESS, payload: false });
      setErrorMessage(error.message);
    };

    if(!error) {
      try {
        const { id } = paymentMethod;
        const { success } = await buyTicketsFetch({ amount: totalPrice, id });
        if (success) {
          const email = userEmail ? userEmail : emailForTickets;
          occupySeatsFetch(seatsToBuy, email);
          dispatch({ type: CLEAR_SEATS_AFTER_BUY, payload: seatsToBuy });
          dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
          dispatch({ type: SET_IS_PAYMENT_SUCCESS, payload: true });
        }
      } catch (error) {
        errorHandler();
      }
    } else {
      errorHandler();
    }
  };

  return (
    <>
      <form onSubmit={ handleSubmit } className="payment-form">
        { errorMessage && <span className="payment-form__error">{ errorMessage.slice(0, -1) }</span> }
        <label className="payment-form__number-field">
          <span>Card number</span>
          <CardNumberElement options={ options }/>
        </label>
        <div>
          <label className="payment-form__date-field">
            <span>Expiration date</span>
            <CardExpiryElement options={ options }/>
          </label>
          <label  className="payment-form__cvc-field">
            <span>CVC</span>
            <CardCvcElement options={ options }/>
          </label>
        </div>
        <button className="button-pink">Купить</button>
        <span className="payment-form__card-types"/>
      </form>
    </>
  );
};

export default PaymentForm;
