/* eslint-disable no-console */
import { buyTicketsFetch, occupySeatsFetch } from "../buyTickets.api";
import { getTotalPrice } from "../../../services/services";
import { SET_SELECTED_SEATS, CHECK_IS_LOADER_OPEN } from "../../../store/actions/action-types";
import React, { useMemo } from "react";
import { useElements, useStripe, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const selectedSeats = useSelector(state => state.selectedSeats);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    const totalPrice = getTotalPrice(selectedSeats);
    const twoPagesBefore = -2;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement
    });

    if(!error) {
      try {
        const { id } = paymentMethod;
        const { success, /* message */ } = await buyTicketsFetch({ amount: totalPrice, id });
        if (success) {
          occupySeatsFetch(selectedSeats);
          dispatch({ type: SET_SELECTED_SEATS, payload: [] });
          dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
          navigate(twoPagesBefore);
        }
      } catch (e) {
        dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
        console.log("Ошибка", e);
      }
    } else {
      dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
      console.log("Ошибка", error.message);
    }
  };

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <label>
          <span>Card number</span>
          <CardNumberElement options={ options }/>
        </label>
        <div>
          <label>
            <span>Expiration date</span>
            <CardExpiryElement options={ options }/>
          </label>
          <label>
            <span>CVC</span>
            <CardCvcElement options={ options }/>
          </label>
        </div>
        <button className="button-pink">Купить</button>
        <div className="card-types"/>
      </form>
    </>
  );
};

export default PaymentForm;
