import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";
import { toast } from "sonner";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { artwork, winningBid } = location.state || {};

  // 💳 Razorpay Payment Handler
  const handlePayment = async () => {
    if (!winningBid) {
      toast.error("Invalid payment amount.");
      return;
    }

    // 💡 Replace this with your Razorpay Test Key ID
    const RAZORPAY_KEY_ID = "rzp_test_RcmMQe7CtlPw2x";

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: winningBid * 100, // amount in paise
      currency: "INR",
      name: "Artify Auctions",
      description: `Payment for ${artwork?.title}`,
      image: "/logo.png", // optional
      handler: function (response) {
        toast.success(
          `✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`
        );

        // You can store the payment in localStorage or database here
        localStorage.setItem(
          "paymentInfo",
          JSON.stringify({
            artwork,
            amount: winningBid,
            paymentId: response.razorpay_payment_id,
            date: new Date().toISOString(),
          })
        );

        navigate("/");
      },
      prefill: {
        name: localStorage.getItem("Firstname") || "Bid Winner",
        email: "user@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Artify Auction Pvt Ltd",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response) {
      toast.error(
        `❌ Payment Failed: ${response.error.description}\nReason: ${response.error.reason}`
      );
    });

    paymentObject.open();
  };

  return (
    <div className="payment-page">
      <h1>💳 Payment Page</h1>
      {artwork ? (
        <>
          <p>
            Artwork: <strong>{artwork.title}</strong>
          </p>
          <p>Artist: {artwork.artist}</p>
          <p>
            Your Winning Bid: <strong>₹{winningBid}</strong>
          </p>
          <button className="pay-now-btn" onClick={handlePayment}>
            Pay Now
          </button>
        </>
      ) : (
        <p>No payment details available.</p>
      )}
    </div>
  );
}
