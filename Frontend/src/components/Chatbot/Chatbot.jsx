import React, { useState } from "react";
import "./Chatbot.css";
import { FaComments } from "react-icons/fa";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Updated toggle function to handle blur effect
  const toggleChat = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("chatbot-blur");
  };

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey there 👋 How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  // ✅ Intent-based responses
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // --- Auction Participation ---
    if (msg.includes("participate") || msg.includes("join") || msg.includes("start bidding")) {
      return "To participate in a bid, create an account, verify your email, and visit the 'Live Auctions' section. Select an artwork and click 'Join Bidding Room' to begin!";
    }

    // --- Live Bidding Room ---
    if (msg.includes("live bidding") || msg.includes("bidding room") || msg.includes("real-time")) {
      return "The Live Bidding Room is a real-time interactive space where registered users can place bids as the auction progresses. You can view other bids, countdown timers, and artwork details there.";
    }

    // --- How to Place a Bid ---
    if ((msg.includes("place") && msg.includes("bid")) || msg.includes("how to bid")) {
      return "To place a bid, open the artwork’s auction page, click 'Bid Now', enter your amount, and confirm. The system will update the top bids instantly.";
    }

    // --- Winning a Bid ---
    if (msg.includes("win") || msg.includes("winner") || (msg.includes("after") && msg.includes("win"))) {
      return "If you win a bid, you’ll receive a confirmation email with payment details. Complete the payment within 48 hours to secure the artwork.";
    }

    // --- Cancellation intent ---
    if ((msg.includes("cancel") && msg.includes("order")) || (msg.includes("cancellation") && msg.includes("order"))) {
      return "To cancel your order, please go to 'My Orders' → select the order → tap 'Cancel Order'. If the order has already been shipped, you can refuse delivery.";
    }

    // --- Artwork Authenticity ---
    if (msg.includes("authentic") || msg.includes("certificate") || msg.includes("genuine")) {
      return "All artworks on our platform are verified by curators. Winners receive a certificate of authenticity with their artwork.";
    }

    // --- Auction Fees / Commission ---
    if (msg.includes("fee") || msg.includes("commission") || msg.includes("charge")) {
      return "A small buyer’s premium (usually 5%) is added to the final bid amount. The total will be displayed before you confirm payment.";
    }

    // --- Account / Registration ---
    if (msg.includes("register") || msg.includes("sign up") || msg.includes("create account")) {
      return "You can register for free using your email ID. Just click 'Sign Up' at the top-right corner and complete verification to start bidding!";
    }

    // --- Order tracking ---
    if (msg.includes("track") || (msg.includes("where") && msg.includes("order"))) {
      return "You can track your order from 'My Orders' section. Once shipped, a tracking link will be provided.";
    }

    // --- Support / Help ---
    if (msg.includes("help") || msg.includes("support") || msg.includes("contact")) {
      return "You can reach our support team at support@artauction.com or via the 'Contact Us' page for personalized assistance.";
    }

    // --- Delivery information ---
    if (msg.includes("delivery") || msg.includes("arrive") || msg.includes("ship")) {
      return "Most orders arrive within 5–7 business days. You'll receive a tracking link once your order is shipped.";
    }

    // --- Return/refund ---
    if (msg.includes("return") || msg.includes("refund")) {
      return "You can request a return or refund from 'My Orders' within 7 days of delivery. Refunds are processed within 3–5 business days.";
    }

    // --- Payment issues ---
    if (msg.includes("payment") || msg.includes("pay") || msg.includes("transaction")) {
      return "We accept all major payment methods — Credit/Debit Cards, UPI, PayPal, and Net Banking. You can choose your preferred option during checkout.";
    }

    // --- Default fallback ---
    return "I'm sorry, I didn’t quite understand that. Could you please rephrase or try asking about auctions, live bidding, registration, order, payment, delivery, or return?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { sender: "user", text: input },
      { sender: "bot", text: getBotResponse(input) },
    ];
    setMessages(newMessages);
    setInput("");
  };

  return (
    <>
      {/* Floating Icon */}
      <div
        className="chatbot-icon"
        onClick={toggleChat} // ✅ Updated here
        title="Chat with us"
      >
        <FaComments />
      </div>

      {/* Chat Overlay */}
      {isOpen && (
        <div className="chatbot-overlay">
          <div className="chatbot-header">
            <h3>Chat with Us 💭</h3>
            <button onClick={toggleChat}>×</button> {/* ✅ Updated here */}
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
