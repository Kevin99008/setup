// components/Certificate.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import '../css/MainPage.css'; // Import CSS for styling

const Certificate = () => {
  const navigate = useNavigate(); // Hook for navigation
  const { loggedIn } = useAuth(); // Get loggedIn state from context

  // Sample data for certificates
  const certificates = [
    { title: "Certificate 1", description: "Description for Certificate 1", pdfLink: "path/to/certificate1.pdf" },
    { title: "Certificate 2", description: "Description for Certificate 2", pdfLink: "path/to/certificate2.pdf" },
    { title: "Certificate 3", description: "Description for Certificate 3", pdfLink: "path/to/certificate3.pdf" },
    { title: "Certificate 4", description: "Description for Certificate 4", pdfLink: "path/to/certificate4.pdf" },
    { title: "Certificate 5", description: "Description for Certificate 5", pdfLink: "path/to/certificate5.pdf" },
  ];

  useEffect(() => {
    // If not logged in, redirect to login page
    if (!loggedIn) {
      navigate('/login'); // Redirect to login page
    }
  }, [loggedIn, navigate]);

  return (
    <div className="main-page">
      <h1>Your Certificates</h1>
      <p>This is where you can view your certificates.</p>
      <div className="card-container">
        {certificates.map((certificate, index) => (
          <div className="card" key={index}>
            <h3 className="card-title">{certificate.title}</h3>
            <p className="card-description">{certificate.description}</p>
            <a href={certificate.pdfLink} target="_blank" rel="noopener noreferrer">
              <button className="view-pdf-button">View PDF</button> {/* Button to view PDF */}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificate;
