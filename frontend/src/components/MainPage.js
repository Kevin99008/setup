// components/MainPage.js

import React from 'react';
import '../css/MainPage.css'; // Import CSS for styling

const MainPage = () => {
  const username = "John Doe"; // Replace with dynamic username if needed

  return (
    <div className="main-page">
      <h1>Welcome to Your Dashboard</h1>
      <p>This is where you can manage your courses and certificates.</p>
    </div>
  );
};

export default MainPage;
