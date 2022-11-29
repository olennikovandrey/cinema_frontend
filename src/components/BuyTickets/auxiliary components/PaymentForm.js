/* eslint-disable no-console */
import { buyTicketsFetch } from "../buyTickets.api";
import React, { useMemo } from "react";
import { CardElement, useElements, useStripe, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const useOptions = () => {
    const options = useMemo(
      () => ({
        style: {
          base: {
            color: "#ffffff",
            letterSpacing: "0.2em",
            fontFamily: "OCRB, sans-serif",
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
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if(!error) {
      try {
        const { id } = paymentMethod;
        const { data } = await buyTicketsFetch({ amount: 1000, id });

        if (data.success) {
          // blabla email
        }
      } catch (e) {
        console.log("Error", e);
      }
    } else {
      console.log("Error", error.message);
    }
  };

  return (
    <>
      <form>
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
      </form>
    </>
  );
};

export default PaymentForm;
