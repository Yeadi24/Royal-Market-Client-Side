import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const PaymentForm = ({ product_id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [product, setProduct] = useState([]);
  const user = use(AuthContext);
  console.log("User: ", user.user);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${product_id}`)
      .then((res) => {
        setProduct(res.data);
        console.log("Fetched product:", res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
      });
  }, [product_id]);
  let price = product.pricePerUnit;
  price = price * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // step- 1: validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    console.log("Error", error);

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }

    // step-2: create payment intent
    const res = await axios.post(
      "http://localhost:3000/create-payment-intent",
      {
        price: price,
      }
    );
    console.log(res);

    const clientSecret = res.data.clientSecret;
    console.log("client secret: ", clientSecret);

    // 3. Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user.user.email,
          name: user.user.displayName,
        },
      },
    });
    console.log("result:", result);

    if (result.error) {
      setError(result.error.message);
      toast.error("Payment Failed");
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        toast.success("Payment Successful");
        const transactionId = result.paymentIntent.id;
        const paymentInfo = {
          Product_id: product_id,
          ProductName: product.itemName,
          transactionId: transactionId,
          email: user.user.email,
          name: user.user.displayName,
          payment_status: "paid",
          amount: parseFloat(result.paymentIntent.amount / 100),
          paidAt: new Date(),
          paidAtString: new Date().toISOString(),
        };
        console.log(paymentInfo);
        // Axios POST
        axios
          .post("http://localhost:3000/orders", paymentInfo)
          .then((res) => {
            console.log("Order saved:", res.data);
            // Show toast or navigate if needed
          })
          .catch((err) => {
            console.error("Order failed:", err);
            // Show error toast or handle UI feedback
          });
        navigate("/dashboard/myorders");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                backgroundColor: "#f6f9fc",
                padding: "10px 12px",
                border: "1px solid #ccd0d2",
                borderRadius: "4px",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe}
          style={{
            backgroundColor: "#5469d4",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Pay ${product.pricePerUnit}
        </button>

        {/* ✅ Display error message if exists */}
        {error && <p className="text-red-800 text-[16px]">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
