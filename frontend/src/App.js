// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import Login from './components/Login'; // Import the Login component
import Footer from './components/Footer'; // Import the Footer component
import MainPage from './components/MainPage'; // Import the Main Page component
import Navbar from './components/Navbar'; // Import the combined Navbar component

const App = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="app-container"> {/* Added a container for styling */}
      {/* Conditionally render Navbar based on the current path */}
      {location.pathname !== '/login' && <Navbar />} 

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} /> {/* Add route for Login */}
          <Route path="/main" element={<MainPage />} /> {/* Add route for Main Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {location.pathname !== '/login' && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
};

// Wrap App with Router in index.js
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
