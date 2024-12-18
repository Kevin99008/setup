// components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // Updated import path for CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/login">Login</Link> {/* Add Login link */}
      </div>
    </nav>
  );
};

export default Navbar;
