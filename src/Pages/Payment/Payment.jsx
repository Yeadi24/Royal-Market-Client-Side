import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useParams } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_publishable_key);

const Payment = () => {
  document.title = "Payment";
  const { id } = useParams();
  const product_id = id;

  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm product_id={product_id}></PaymentForm>
      </Elements>
    </div>
  );
};

export default Payment;
