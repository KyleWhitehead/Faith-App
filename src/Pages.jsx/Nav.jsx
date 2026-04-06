import React from "react";
import { Link } from "react-router-dom";
import './Nav.css'

function Nav() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/translation" target="_blank">
          Translations
        </Link>
      </nav>
    </div>
  );
}

export default Nav;