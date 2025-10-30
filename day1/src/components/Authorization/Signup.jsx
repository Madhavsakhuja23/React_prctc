import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Signup.css";

function SignUp() {
  const [formData, setFormData] = useState({
    fn: "",
    ln: "",
    email: "",
    phone: "",
    pwd: "",
    cpwd: "",
    captchaInput: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pwd: "",
    captcha: "",
  });

  const [captcha, setCaptcha] = useState("");
  const navigate = useNavigate();

  // Generate captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Generate random captcha
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let cap = "";
    for (let i = 0; i < 6; i++)
      cap += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptcha(cap);
  };

  // Validation functions
  const validateName = () => {
    const hasUpper = /[A-Z]/.test(formData.fn);
    const hasLower = /[a-z]/.test(formData.fn);
    if (!hasUpper || !hasLower) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must contain both uppercase and lowercase letters.",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, name: "" }));
    return true;
  };

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    const storedEmail = localStorage.getItem("email");
    if (!regex.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Email must end with @gmail.com or @yahoo.com.",
      }));
      return false;
    }
    if (storedEmail === formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: "An account with this email already exists.",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const validatePassword = () => {
    const { pwd, cpwd } = formData;
    if (pwd.length < 10) {
      setErrors((prev) => ({
        ...prev,
        pwd: "Password must be at least 10 characters long.",
      }));
      return false;
    }
    if (!/[A-Z]/.test(pwd) || !/\d/.test(pwd)) {
      setErrors((prev) => ({
        ...prev,
        pwd: "Password must include an uppercase letter and a number.",
      }));
      return false;
    }
    if (pwd !== cpwd) {
      setErrors((prev) => ({ ...prev, pwd: "Passwords do not match." }));
      return false;
    }
    setErrors((prev) => ({ ...prev, pwd: "" }));
    return true;
  };

  const validateCaptcha = () => {
    if (formData.captchaInput.trim() !== captcha.trim()) {
      setErrors((prev) => ({ ...prev, captcha: "Captcha does not match." }));
      return false;
    }
    setErrors((prev) => ({ ...prev, captcha: "" }));
    return true;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPwdValid = validatePassword();
    const isCaptchaValid = validateCaptcha();

    if (isNameValid && isEmailValid && isPwdValid && isCaptchaValid) {
      localStorage.setItem("Firstname", formData.fn);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("password", formData.pwd);

      // alert("Account created successfully!");
      navigate("/login");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Banner */}
        <div className="banner">
          <h1>Discover, Bid, and Own Art with Aurtistiq</h1>
          <p>
            Create a free account and join global collectors and artists in
            redefining art auctions. Experience a modern way to connect with
            creativity.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="form-section">
          <NavLink to="/" className="close-btn">
            &times;
          </NavLink>
          <div id="outer">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="fn"
                placeholder="First Name"
                value={formData.fn}
                onChange={handleChange}
                required
              />
              {errors.name && <div className="error-text">{errors.name}</div>}

              <input
                type="text"
                id="ln"
                placeholder="Last Name"
                value={formData.ln}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="error-text">{errors.email}</div>}

              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                minLength="10"
                maxLength="10"
              />

              <input
                type="password"
                id="pwd"
                placeholder="Password"
                value={formData.pwd}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                id="cpwd"
                placeholder="Confirm Password"
                value={formData.cpwd}
                onChange={handleChange}
                required
              />
              {errors.pwd && <div className="error-text">{errors.pwd}</div>}

              {/* Captcha */}
              <div className="captcha-container">
                <div className="captcha-box">{captcha}</div>
                <button
                  type="button"
                  className="captcha-refresh"
                  onClick={generateCaptcha}
                >
                  ↻ Refresh
                </button>
              </div>

              <input
                type="text"
                id="captchaInput"
                placeholder="Enter captcha here"
                value={formData.captchaInput}
                onChange={handleChange}
                required
              />
              {errors.captcha && (
                <div className="error-text">{errors.captcha}</div>
              )}

              <input type="submit" value="Register" />
              <p className="login-link">
                Already have an account?{" "}
                <NavLink to="/login">Login</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
