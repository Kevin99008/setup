// components/Footer.js

import React from 'react';
import '../css/Footer.css'; // Import CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@aquacube.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="social-media">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>About AquaCube</h4>
          <p>AquaCube is dedicated to providing top-notch swimming and music education. Join us to explore your potential!</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 AquaCube. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
