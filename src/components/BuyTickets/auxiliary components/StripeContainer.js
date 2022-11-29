import PaymentForm from "./PaymentForm";
import { STRIPE_PUBLIC_KEY } from "../../../constants/constants";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const StripeContainer = () => {
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

  return (
    <Elements stripe={ stripePromise }>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
