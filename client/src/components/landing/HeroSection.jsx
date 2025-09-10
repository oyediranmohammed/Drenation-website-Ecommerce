import React from 'react';
import { Search } from "lucide-react"; 


function HeroSection({ selectedState, setSelectedState, states, selectedLga, setSelectedLga, lgaList, searchTerm, setSearchTerm, handleSearchClick }) {
  return (
    <section className="px-6 py-12 text-center">
      <h2 className="text-3xl md:text-5xl font-semibold mb-4">Buy & Sell Anything</h2>
      <p className="mb-6">Search thousands of listings around you</p>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
        <select
          className="px-4 py-2 rounded text-black"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((state, idx) => (
            <option key={idx} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 rounded text-black"
          value={selectedLga}
          onChange={(e) => setSelectedLga(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select LGA</option>
          {lgaList.map((lga, idx) => (
            <option key={idx} value={lga}>
              {lga}
            </option>
          ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search for phones, cars, laptops..."
          className="w-full px-4 py-2 pr-12 rounded text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gold"
        >
          <Search />
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
