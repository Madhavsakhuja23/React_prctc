import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Otp.css";
import { toast } from "sonner";

const Otp = () => {
  const navigate = useNavigate();
  const generatedOtp = localStorage.getItem("otp"); 
  const [otp, setOtp] = useState("");
  const [err, updatedError] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("otp");
      console.log("⏰ OTP expired and removed from localStorage");
      toast.error("⚠️ OTP expired. Please log in again.")
      // alert("⚠️ OTP expired. Please log in again.");
      navigate("/login");
    }, 10 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      toast.success("Login Successfully");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.removeItem("otp");
      navigate("/");
    } else {
      updatedError("❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <h2>OTP Verification</h2>
        <p>Enter the 4-digit OTP sent to your registered email.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="4"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <div id="error">{err}</div>
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
