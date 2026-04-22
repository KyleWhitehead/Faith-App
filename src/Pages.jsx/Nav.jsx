import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div>
      <div className="body">
        <div className="navbar">
          <div className="nav__links">
            <Link to="/" className="nav__link">
              Home
            </Link>
            <Link to="/about" className="nav__link">
              About
            </Link>
            <Link to="/contact" className="nav__link">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
