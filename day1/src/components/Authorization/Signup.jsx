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
    role: "", // 👈 new field for Seller/Buyer
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pwd: "",
    captcha: "",
    role: "", // 👈 role error
  });

  const [captcha, setCaptcha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let cap = "";
    for (let i = 0; i < 6; i++)
      cap += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptcha(cap);
  };

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

  const validateEmail = async () => {
    const key = "ema_live_myHyeXrksaI52K3z9nDBs1z46RYEjNL9W4CaMKRd";
    const email = formData.email.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      return false;
    }

    const url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

    try {
      const res = await fetch(url);
      const result = await res.json();

      if (result.state === "deliverable") {
        setErrors((prev) => ({ ...prev, email: "" }));
        return true;
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "This email address is invalid or undeliverable.",
        }));
        return false;
      }
    } catch (error) {
      console.error("Email validation error:", error);
      setErrors((prev) => ({
        ...prev,
        email: "Error validating email. Please try again.",
      }));
      return false;
    }
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

  const validateRole = () => {
    if (!formData.role) {
      setErrors((prev) => ({
        ...prev,
        role: "Please select whether you are a Seller or Buyer.",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, role: "" }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingEmail = localStorage.getItem("email");
    if (existingEmail === formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: "Account already registered with this email.",
      }));
      return;
    }

    const isNameValid = validateName();
    const isEmailValid = await validateEmail();
    const isPwdValid = validatePassword();
    const isCaptchaValid = validateCaptcha();
    const isRoleValid = validateRole();

    if (isNameValid && isEmailValid && isPwdValid && isCaptchaValid && isRoleValid) {
      localStorage.setItem("Firstname", formData.fn);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("password", formData.pwd);
      localStorage.setItem("role", formData.role); // 👈 save role

      navigate("/login");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="banner">
          <h1>Discover, Bid, and Own Art with Aurtistiq</h1>
          <p>
            Create a free account and join global collectors and artists in redefining art auctions.
          </p>
        </div>

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
                onBlur={validateEmail}
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

              {/* 👇 New Section for Seller/Buyer */}
              <div className="role-section">
                <label><b>Register As:</b></label>
                <div className="role-options">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="Seller"
                      checked={formData.role === "Seller"}
                      onChange={handleRoleChange}
                    />
                    Seller
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="Buyer"
                      checked={formData.role === "Buyer"}
                      onChange={handleRoleChange}
                    />
                    Buyer
                  </label>
                </div>
                {errors.role && <div className="error-text">{errors.role}</div>}
              </div>

              {/* Captcha */}
              <div className="captcha-container">
                <div className="captcha-box">{captcha}</div>
                <button type="button" className="captcha-refresh" onClick={generateCaptcha}>
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
              {errors.captcha && <div className="error-text">{errors.captcha}</div>}

              <input type="submit" value="Register" />
              <p className="login-link">
                Already have an account? <NavLink to="/login">Login</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
