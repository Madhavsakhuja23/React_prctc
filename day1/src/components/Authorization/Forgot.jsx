import React, { useState } from "react";
import "./forgot.css"; 
import { Link } from "react-router-dom";
import forgotImg from "/forgot.png"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your registered email address");
      return;
    }

    setStatus("success");
    setMessage("✅ Password reset link sent successfully to your email!");
    setEmail("");
  };

  return (
  <div className="ForgotPage">
    <div className="Fcontainer">
      <Link to="/" className="close-btn">&times;</Link>

      <div className="illustration">
        <img src={forgotImg} alt="Forgot Password Illustration" />
      </div>

      <div className="form-section">
        <h1>Forgot Password?</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Registered Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {message && (
            <p
              id="emailexist"
              style={{
                color: status === "success" ? "#2e7d32" : "#d9534f",
              }}
            >
              {message}
            </p>
          )}
          <button type="submit">Send Reset Link</button>
        </form>
        <div className="links">
          <p>
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
}
