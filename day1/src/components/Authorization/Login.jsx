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
    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem("Firstname", storedName);

    sessionStorage.setItem("Firstname", storedName);
    navigate("/");
  } else {
    alert("Invalid email or password. Please try again.");
  }
};


  return (
    <>
      <div className="login-container">
        <Link to="/" className="close-btn">
          &times;
        </Link>

        <div className="form-section">
          <div className="form-box">
            <h2>Welcome Back!</h2>
            <p className="subtitle">
              Log in to continue exploring and bidding on unique art with{" "}
              <strong>Aurtistiq</strong>.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
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

              <p className="signup-link">
                Not a member? <Link to="/signup">Register now</Link>
              </p>
            </form>
          </div>
        </div>

        <div className="banner">
          <div className="banner-content">
            <h1>“Where creativity finds its true collector.”</h1>
            <p>
              Discover and own one-of-a-kind pieces from global artists on
              Aurtistiq.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
