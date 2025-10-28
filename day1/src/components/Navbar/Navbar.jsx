import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

const toggleUserDropdown = () => {
  setIsUserDropdownOpen(!isUserDropdownOpen);
};
const handleLogout = () => {
  localStorage.removeItem("userName");
  setUserName(null);
  setIsUserDropdownOpen(false);
};
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const storedName = localStorage.getItem("Firstname");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);
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
           {userName ? (
          <>
            <span
              onClick={toggleUserDropdown}
              className="dropdown-link username"
            >
             {userName} ▾
            </span>
            {isUserDropdownOpen && (
              <div className="mobile-user-dropdown">
                <NavLink onClick={toggleMenu} to="/profile">View Profile</NavLink>
                <NavLink onClick={toggleMenu} to="/settings">Settings</NavLink>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </>
        ) : (
          <NavLink onClick={toggleMenu} className="dropdown-link" to="/Sign-In">
            Sign In
          </NavLink>
        )}
        </div>
      </div>

      {/* Mobile dropdown menu (below navbar) */}
      <div className={`dropdown-menu-panel ${isMenuOpen ? "open" : ""}`}>
        <NavLink onClick={toggleMenu} className="dropdown-link" to="/">Home</NavLink>
        <NavLink onClick={toggleMenu} className="dropdown-link" to="/Collection">Collect</NavLink>
        <NavLink onClick={toggleMenu} className="dropdown-link" to="/Auction">Auctions</NavLink>
         {userName ? (
          <>
            <span
              onClick={toggleUserDropdown}
              className="dropdown-link username"
            >
              {userName} ▾
            </span>
            {isUserDropdownOpen && (
              <div className="mobile-user-dropdown">
                <NavLink onClick={toggleMenu} to="/profile">View Profile</NavLink>
                <NavLink onClick={toggleMenu} to="/settings">Settings</NavLink>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </>
        ) : (
          <NavLink onClick={toggleMenu} className="dropdown-link" to="/Sign-In">
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
