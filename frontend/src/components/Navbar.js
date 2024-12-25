// components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import '../css/Navbar.css'; // Import CSS for styling

const Navbar = () => {
  const { loggedIn, logout } = useAuth(); // Get loggedIn state and logout function
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate('/'); // Redirect to Home.js after logging out
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul>
          {loggedIn ? (
            <>
              <li>
                <Link to="/main">My Courses</Link> {/* Link to Main Page */}
              </li>
              <li>
                <Link to="/certificates">My Certificates</Link> {/* Link to Certificates Page */}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-right">
        {loggedIn ? (
          <>
            <span>{localStorage.getItem("username")}</span> {/* Display username */}
            <button onClick={handleLogout} className="logout-button">Logout</button> {/* Logout button */}
          </>
        ) : (
          <Link to="/login">Login</Link> // Display Login link for other pages
        )}
      </div>
    </nav>
  );
};

export default Navbar;
