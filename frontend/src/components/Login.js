// components/Login.js

import React, { useState } from 'react';
import '../css/Login.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from context

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { login } = useAuth(); // Get login function from context

  // Mock credentials
  const mockCredentials = {
    username: 'testUser', // Replace with your desired mock username
    password: 'testPass'   // Replace with your desired mock password
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if entered credentials match the mock credentials
    if (username === mockCredentials.username && password === mockCredentials.password) {
      login(username); // Call login function from context
      navigate('/main'); // Redirect to Main Page after successful login
    } else {
      alert('Invalid username or password'); // Show error message for invalid credentials
    }
  };

  return (
    <div className="login-container">
      <div className="login-box"> {/* Added a wrapper for the white background */}
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="login-button">Login</button> {/* Add class for styling */}
        </form>
      </div>
    </div>
  );
};

export default Login;
