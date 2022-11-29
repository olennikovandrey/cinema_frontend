import PaymentForm from "./PaymentForm";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY = "pk_test_51M89aKEhipLO19N11C4bASqXiammsBg5B14CmRMVVesr00z2t4itHImZKWAGqseicKtvbHSEG5dcGFETrViww63400dxWVZcYq";
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={ stripePromise }>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
