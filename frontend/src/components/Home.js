// components/Home.js

import React from 'react';
import '../css/Home.css'; // Import CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">AquaCube</h1> {/* Add a class for styling */}
      <p className="description">
        Welcome to AquaCube, where we believe in nurturing talent through swimming and music! Our dedicated instructors provide personalized training sessions designed to enhance your skills in both disciplines. Whether you’re looking to dive into the world of swimming or want to explore the beauty of music, AquaCube is your perfect partner on this journey.
      </p>
    </div>
  );
};

export default Home;
