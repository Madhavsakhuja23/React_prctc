import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src="/logo.png" alt="logo" className="navbar-logo" />
          <NavLink className="navbar-brand" to="/">
            Aurtistiq
          </NavLink>
        </div>
        <form className="search-bar" role="search">
          <input
            className="search-input"
            type="search"
            placeholder="Search artworks..."
            aria-label="Search"
          />
        </form>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="navbar-links d-flex align-items-center">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/Collection">Collect</NavLink>
            <NavLink className="nav-link" to="/Auction">Auctions</NavLink>
            <NavLink className="nav-link" to="/Sign-In">Sign In</NavLink>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
