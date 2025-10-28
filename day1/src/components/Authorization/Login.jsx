import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedName = localStorage.getItem("Firstname");

    if (email === storedEmail && pwd === storedPassword) {
      sessionStorage.setItem("Firstname", storedName);
      navigate("/");
    } else {
      alert("Enter valid details");
    }
  };

  return (
    <div className="login-container">
      {/* Cross Button */}
      <Link to="/" className="close-btn">
        &times;
      </Link>

      {/* Left Form Section */}
      <div className="form-section">
        <h1>Welcome back!</h1>
        <p className="subtitle">
          Log in to continue exploring and bidding on unique art with{" "}
          <strong>Aurtistiq</strong>.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            id="pwd"
            placeholder="Password"
            required
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />

          <div className="forgot-link">
            <Link to="/forgot">Forgot Password?</Link>
          </div>

          <input type="submit" value="Login" />
        </form>

        <p className="signup-link">
          Not a member? <Link to="/signup">Register now</Link>
        </p>
      </div>

      {/* Right Banner Section */}
      <div className="banner">
        <div className="banner-content">
          <img src="/login.png" alt="Art Illustration" />
          <h2>"Where creativity finds its true collector."</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
