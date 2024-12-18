// components/Login.js

import React from 'react';
import '../css/Login.css'; // Import CSS for styling

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="login-button">Login</button> {/* Add class for styling */}
      </form>
    </div>
  );
};

export default Login;
