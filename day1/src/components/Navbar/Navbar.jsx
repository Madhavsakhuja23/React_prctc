import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [isWinner, setIsWinner] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle dropdown
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("isWinner");
    sessionStorage.removeItem("Firstname");
    sessionStorage.removeItem("email");

    setUserName(null);
    setRole(null);
    setIsWinner(false);
    setIsUserDropdownOpen(false);
  };

  // Search handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value); // Pass to parent (Collection page)
  };

  // Load stored data
  useEffect(() => {
    const storedName = localStorage.getItem("Firstname");
    const loggedIn = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("role");
    const winnerStatus = localStorage.getItem("isWinner");

    if (storedName && loggedIn) {
      setUserName(storedName);
      setRole(storedRole);
      setIsWinner(winnerStatus === "true");
    }

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector(".user-dropdown");
      if (dropdown && !dropdown.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Logo */}
        <div className="d-flex align-items-center">
          <NavLink className="navbar-brand" to="/">
            <img src="/logo.png" alt="logo" className="navbar-logo" />
            Aurtistiq
          </NavLink>
        </div>

        {/* Search Bar */}
        <form className="search-bar" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            className="search-input"
            type="search"
            placeholder="Search artworks..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>

        {/* Hamburger for mobile */}
        <button
          className={`custom-toggler ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="custom-hamburger"></span>
        </button>

        {/* Desktop Links */}
        <div className="navbar-links d-none d-lg-flex align-items-center">
          {role === "Seller" ? (
            <>
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/upload">Upload Artwork</NavLink>
              <NavLink className="nav-link" to="/live-auctions">Live Auctions</NavLink>
              <NavLink className="nav-link" to="/history">History</NavLink>
            </>
          ) : (
            <>
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/Collection">Collect</NavLink>
              <NavLink className="nav-link" to="/Auction">Auctions</NavLink>
              {userName && isWinner && (
                <NavLink className="nav-link" to="/bid-history">Bid History</NavLink>
              )}
            </>
          )}

          {/* User Dropdown */}
          {userName ? (
            <div className="user-dropdown">
              <span onClick={toggleUserDropdown} className="username">
                {userName} ▾
              </span>
              {isUserDropdownOpen && (
                <div className="user-dropdown-menu">
                  <NavLink to="/profile">View Profile</NavLink>
                  <NavLink to="/settings">Settings</NavLink>
                  <button onClick={handleLogout}>Log Out</button>
                </div>
              )}
            </div>
          ) : (
            <NavLink onClick={toggleMenu} className="dropdown-link" to="/signup">
              Sign In
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`dropdown-menu-panel ${isMenuOpen ? "open" : ""}`}>
        {role === "Seller" ? (
          <>
            <NavLink onClick={toggleMenu} className="dropdown-link" to="/">Home</NavLink>
            <NavLink onClick={toggleMenu} className="dropdown-link" to="/upload">Upload Artwork</NavLink>
            <NavLink onClick={toggleMenu} className="dropdown-link" to="/live-auctions">Live Auctions</NavLink>
            <NavLink onClick={toggleMenu} className="dropdown-link" to="/history">History</NavLink>
          </>
        ) : (
          <>
            <NavLink onClick={toggleMenu} className="dropdown-link" to="/">Home</NavLink>
            <NavLink onClick={toggleMenu} className="dropdown-link" to="/Collection">Collect</NavLink>
            <NavLink onClick={toggleMenu} className="dropdown-link" to="/Auction">Auctions</NavLink>
            {userName && isWinner && (
              <NavLink onClick={toggleMenu} className="dropdown-link" to="/bid-history">
                Bid History
              </NavLink>
            )}
          </>
        )}

        {userName ? (
          <>
            <span onClick={toggleUserDropdown} className="dropdown-link username">
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
