import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./forgot.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdColor, setPwdColor] = useState("#d9534f");

  // 🟡 Pre-fill email if it exists in localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email") || "";
    setEmail(storedEmail);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedEmail = localStorage.getItem("email");

    setEmailMsg("");
    setPwdMsg("");

    if (savedEmail !== email) {
      setEmailMsg("No account with this email.");
      return;
    }

    if (pwd.length < 10) {
      setPwdMsg("Password must be at least 10 characters long.");
      setPwdColor("#d9534f");
      return;
    }

    if (!/[A-Z]/.test(pwd) || !/\d/.test(pwd)) {
      setPwdMsg("Password must include an uppercase letter and a number.");
      setPwdColor("#d9534f");
      return;
    }

    if (pwd !== cpwd) {
      setPwdMsg("Passwords do not match.");
      setPwdColor("#d9534f");
      return;
    }

    setPwdMsg("Password is strong and matches.");
    setPwdColor("green");

    // ✅ Save new password
    localStorage.setItem("password", pwd);

    // Redirect after success
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="container">
      {/* Left Illustration */}
      <div className="illustration">
        <img src="/forgot.png" alt="Forgot Password Illustration" />
      </div>

      {/* Right Form */}
      <div className="form-section">
        <NavLink to="/" className="close-btn">
          &times;
        </NavLink>

        <h1>Forgot Password</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Enter the email address you used to register
          </label>
          <input
            type="email"
            id="email"
            placeholder="Please enter your email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailMsg && <div id="emailexist">{emailMsg}</div>}

          <input
            type="password"
            id="pwd"
            placeholder="New Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />

          <div id="pwdcriteria" style={{ color: pwdColor, display: pwdMsg ? "block" : "none" }}>
            {pwdMsg}
          </div>

          <input
            type="password"
            id="cpwd"
            placeholder="Confirm Password"
            value={cpwd}
            onChange={(e) => setCpwd(e.target.value)}
            required
          />

          <button type="submit">Change Password</button>

          <div className="links">
            <a href="#">Terms & Conditions</a> • <a href="#">Privacy Policy</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
