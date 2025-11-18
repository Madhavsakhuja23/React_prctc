import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./Login.css";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  // Login states
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  // OTP states
  const [showOtp, setShowOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [err, setErr] = useState("");

  // Timer
  const [timer, setTimer] = useState(60); // 60 seconds

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: pwd }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      toast.error(data.message);
      return;
    }

    // 1️⃣ Store login user temporarily (before OTP verification)
    sessionStorage.setItem("tempUser", JSON.stringify(data.user));

    // 2️⃣ Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);

    // 3️⃣ Send email
    const emailSent = await sendEmail(email, otp);
    if (emailSent) {
      toast.success("OTP sent!");
      setShowOtp(true);
      setTimer(60);
    } else {
      toast.error("Failed to send OTP.");
    }

  } catch (error) {
    console.error(error);
    toast.error("Server error");
  }
};
  async function sendEmail(userEmail, otp) {
    const params = { email: userEmail, otp: otp };

    try {
      await emailjs.send(
        "service_gc6z3ld",
        "template_jj402sx",
        params,
        "oC1THPuL3vFnDxaE2"
      );
      return true;
    } catch (error) {
      console.error("EmailJS Error:", error);
      return false;
    }
  }

  // ----------------------------------------------
  // ⭐ OTP TIMER + AUTO EXPIRY
  // ----------------------------------------------
  useEffect(() => {
    if (!showOtp) return;

    if (timer === 0) {
      setShowOtp(false);       // Hide OTP box
      setGeneratedOtp("");    // Clear OTP
      setOtpInput("");        // Clear input
      toast.error("⚠️ OTP expired. Please login again.");
      return;
    }

    const countdown = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [timer, showOtp]);

  // Verify OTP
  const verifyOtp = (e) => {
  e.preventDefault();

  if (otpInput === generatedOtp) {
    toast.success("🎉 Login Successful!");

    // get user data from session
    const loggedUser = JSON.parse(sessionStorage.getItem("tempUser"));

    // store logged user for full session
    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("isLoggedIn", "true");

    navigate("/");
  } else {
    setErr("❌ Invalid OTP. Try again.");
  }
};


  return (
    <div className="login-container">
      <Link to="/" className="close-btn">&times;</Link>

      <div className="form-section">
        <div className="form-box">
          <h2>Welcome Back!</h2>
          <p className="subtitle">
            Log in to continue exploring and bidding on unique art with{" "}
            <strong>Aurtistiq</strong>.
          </p>

          {/* LOGIN FORM */}
          {!showOtp && (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                required
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />

              <div className="forgot-link">
                <Link to="/forgot">Forgot Password?</Link>
              </div>

              <input type="submit" value="Login" />

              <p className="signup-link">
                Not a member? <Link to="/signup">Register now</Link>
              </p>
            </form>
          )}

          {/* OTP BOX */}
          {showOtp && (
            <div className="otp-box">
              <h3>OTP Verification</h3>
              <p>Enter the OTP sent to your email.</p>

              {/* Timer */}
              <p style={{ color: "red", marginBottom: "10px" }}>
                ⏳ OTP expires in: <strong>{timer}s</strong>
              </p>

              <form onSubmit={verifyOtp}>
                <input
                  type="text"
                  maxLength="4"
                  placeholder="Enter OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  required
                />

                <div id="error">{err}</div>

                <button type="submit">Verify OTP</button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="banner">
        <div className="banner-content">
          <h1>“Where creativity finds its true collector.”</h1>
          <p>
            Discover and own one-of-a-kind pieces from global artists on Aurtistiq.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
