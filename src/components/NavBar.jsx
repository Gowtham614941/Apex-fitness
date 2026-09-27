import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="arch-nav">
      <div className="arch-nav-inner">
        <NavLink to="/" className="arch-brand" onClick={closeMenu}>
          <span className="brand-dot"></span>
          APEX FITNESS
        </NavLink>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={toggleMenu} 
          aria-label="Toggle navigation menu"
        >
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
        </button>

        {/* Navigation Links */}
        <nav className={`arch-links ${menuOpen ? "show" : ""}`}>
          <NavLink 
            to="/" 
            end 
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Overview
          </NavLink>
          <NavLink 
            to="/plans" 
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Tiers
          </NavLink>
          <NavLink 
            to="/join" 
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Join
          </NavLink>
          <NavLink 
            to="/members" 
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Directory
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;