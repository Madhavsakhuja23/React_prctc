import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        {/* Left: Logo + Brand */}
        <div className="d-flex align-items-center">
          <img src="/logo.png" alt="logo" className="navbar-logo" />
          <NavLink className="navbar-brand" to="/">
            Aurtistiq
          </NavLink>
        </div>

        {/* Center: Search bar */}
        <form className="search-bar" role="search">
          <input
            className="search-input"
            type="search"
            placeholder="Search artworks..."
            aria-label="Search"
          />
        </form>

        {/* Right: Hamburger (mobile) */}
        <button
          className={`custom-toggler ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="custom-hamburger"></span>
        </button>

        {/* Desktop links */}
        <div className="navbar-links d-none d-lg-flex align-items-center">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/Collection">Collect</NavLink>
          <NavLink className="nav-link" to="/Auction">Auctions</NavLink>
          <NavLink className="nav-link" to="/Sign-In">Sign In</NavLink>
        </div>
      </div>

      {/* Mobile dropdown menu (below navbar) */}
      <div className={`dropdown-menu-panel ${isMenuOpen ? "open" : ""}`}>
        <NavLink onClick={toggleMenu} className="dropdown-link" to="/">Home</NavLink>
        <NavLink onClick={toggleMenu} className="dropdown-link" to="/Collection">Collect</NavLink>
        <NavLink onClick={toggleMenu} className="dropdown-link" to="/Auction">Auctions</NavLink>
        <NavLink onClick={toggleMenu} className="dropdown-link" to="/Sign-In">Sign In</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
