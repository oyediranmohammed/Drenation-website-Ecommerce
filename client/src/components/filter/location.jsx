import React, { useState, useEffect } from "react";
import statesWithLgas from "@/config/stateAndLga";

const LocationFilter = ({ onFilter }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [lgaOptions, setLgaOptions] = useState([]);

  useEffect(() => {
    if (selectedState) {
      setLgaOptions(statesWithLgas[selectedState]);
      setSelectedLga(""); // reset LGA when state changes
    }
  }, [selectedState]);

  const handleFilter = () => {
    if (selectedState && selectedLga) {
      onFilter(selectedState, selectedLga);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center p-4 bg-white rounded-xl shadow">
      {/* State Dropdown */}
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select State</option>
        {Object.keys(statesWithLgas).map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* LGA Dropdown */}
      <select
        value={selectedLga}
        onChange={(e) => setSelectedLga(e.target.value)}
        disabled={!selectedState}
        className="border p-2 rounded"
      >
        <option value="">Select LGA</option>
        {lgaOptions.map((lga) => (
          <option key={lga} value={lga}>
            {lga}
          </option>
        ))}
      </select>

      {/* Filter Button */}
      <button
        onClick={handleFilter}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Filter
      </button>
    </div>
  );
};

export default LocationFilter;
