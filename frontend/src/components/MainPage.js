// components/MainPage.js

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar'; // Ensure you import Navbar
import '../css/MainPage.css'; // Import CSS for styling

const MainPage = () => {
  const [loggedIn, setLoggedIn] = useState(true); // State to manage login status
  const [showPopup, setShowPopup] = useState(false); // State to manage pop-up visibility
  const alreadyShown = useRef(false); // Track if the popup has already been shown

  // Sample data for courses with checked states
  const courses = [
    { title: "Course 1", description: "Description for Course 1", quota: 10, completed: 7 }, // 7 out of 10 checked
    { title: "Course 2", description: "Description for Course 2", quota: 10, completed: 5 }, // 5 out of 10 checked
    { title: "Course 3", description: "Description for Course 3", quota: 10, completed: 0 }, // No boxes checked
  ];

  useEffect(() => {
    const nearingCompletion = courses.some(course => course.completed >= 7);
    
    if (nearingCompletion && !alreadyShown.current) {
      setShowPopup(true); // Show the pop-up if any course is nearing completion
      alreadyShown.current = true; // Set the flag to true to prevent showing again
    }
    
  }, [courses]);

  const handleClosePopup = () => {
    setShowPopup(false); // Close the pop-up
  };

  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false"); // Clear logged-in status
    localStorage.removeItem("username"); // Remove username from local storage
    setLoggedIn(false); // Update login status to false
    alreadyShown.current = false; // Reset the popup shown state on logout
    setShowPopup(false); // Optional: Close any open pop-ups on logout
    console.log("User logged out"); // Placeholder for actual logout logic
    // Add any additional logout logic here if needed.
  };

  return (
    <div className="main-page">
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} /> {/* Pass loggedIn and handleLogout to Navbar */}
      <h1>Welcome to Your Dashboard</h1>
      <p>This is where you can manage your courses.</p>
      <div className="card-container">
        {courses.map((course, index) => (
          <div className="card" key={index}>
            <h3 className="card-title">{course.title}</h3>
            <p className="card-description">{course.description}</p>
            <div className="checkbox-container">
              {Array.from({ length: course.quota }).map((_, boxIndex) => {
                const isChecked = boxIndex < course.completed; // Check if this box should be checked
                return (
                  <div 
                    className={`checkbox ${isChecked ? 'checked' : ''}`} 
                    key={boxIndex}
                  ></div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up Notification */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Reminder!</h2>
            <p>Some of your courses have been checked up to seven times. They are going to end soon!</p>
            <button onClick={handleClosePopup}>Close</button> {/* Close button */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
