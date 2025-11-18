import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout
  const handleLogout = () => {
    console.log("LOGOUT CLICKED");

    localStorage.clear();
    sessionStorage.clear();

    setUser(null);
    navigate("/", { replace: true });
    window.location.reload(); 
  };

  // Search handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector(".user-dropdown-menu");
      const usernameBtn = document.querySelector(".username");

      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        usernameBtn &&
        !usernameBtn.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            className="search-input"
            type="search"
            placeholder="Search artworks..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>

        {/* Hamburger */}
        <button
          className={`custom-toggler ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="custom-hamburger"></span>
        </button>

        {/* Desktop Links */}
        <div className="navbar-links d-none d-lg-flex align-items-center">

          {/* ROLE BASED MENU */}
          {user?.role === "Seller" ? (
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
            </>
          )}

          {/* USER DROPDOWN */}
          {user ? (
            <div
              className="user-dropdown"
              onClick={(e) => e.stopPropagation()} // Prevent bubbling
            >
              <span
                className="username"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleUserDropdown();
                }}
              >
                {user.name} ▾
              </span>

              {isUserDropdownOpen && (
                <div
                  className="user-dropdown-menu"
                  onClick={(e) => e.stopPropagation()} // Keep dropdown open
                >
                  <NavLink to="/profile">View Profile</NavLink>
                  <NavLink to="/settings">Settings</NavLink>

                  <button
                    type="button"
                    className="logout-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLogout();
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink className="dropdown-link" to="/signup">
              Sign In
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`dropdown-menu-panel ${isMenuOpen ? "open" : ""}`}>

        {user?.role === "Seller" ? (
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
          </>
        )}

        {user ? (
          <>
            <span
              className="username"
              onClick={(e) => {
                e.stopPropagation();
                toggleUserDropdown();
              }}
            >
              {user.name} ▾
            </span>

            {isUserDropdownOpen && (
              <div
                className="mobile-user-dropdown"
                onClick={(e) => e.stopPropagation()} // Prevent close
              >
                <NavLink onClick={toggleMenu} to="/profile">View Profile</NavLink>
                <NavLink onClick={toggleMenu} to="/settings">Settings</NavLink>

                <button
                  type="button"
                  className="logout-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleLogout();
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </>
        ) : (
          <NavLink onClick={toggleMenu} className="dropdown-link" to="/signup">
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
