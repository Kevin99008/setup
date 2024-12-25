// context/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");

  const login = (username) => {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("username");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
