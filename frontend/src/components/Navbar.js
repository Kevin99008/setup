// components/Navbar.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // Import CSS for styling

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      setUsername(localStorage.getItem("username")); // Get username from local storage
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul>
          {loggedIn ? (
            <>
              <li>
                <Link to="/my-courses">My Courses</Link>
              </li>
              <li>
                <Link to="/my-certificates">My Certificates</Link>
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
          <div className="user-info">
            <img src="path/to/user-icon.png" alt="User Icon" className="user-icon" /> {/* Replace with actual icon path */}
            <span>{username}</span> {/* Display username */}
          </div>
        ) : (
          <Link to="/login">Login</Link> // Display Login link for other pages
        )}
      </div>
    </nav>
  );
};

export default Navbar;
