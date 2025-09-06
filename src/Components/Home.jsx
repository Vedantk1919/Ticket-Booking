import React, { useState } from 'react';
import Movies from './Movies';

const Home = () => {
  // 1. State to hold the search term
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      {/* --- NEW: SEARCH BAR SECTION --- */}
      <div className="bg-[#1a1a24] p-6 sm:p-10 text-center">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Find Your Next Show</h1>
          <p className="text-gray-400 mb-6">Explore thousands of movies, concerts, and theater events.</p>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for a movie or show..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update state on every key press
              className="w-full bg-[#13131a] text-white border border-gray-600 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* 2. Pass the searchTerm down to the Movies component as a prop */}
      <Movies searchTerm={searchTerm} />
    </div>
  );
};

export default Home;