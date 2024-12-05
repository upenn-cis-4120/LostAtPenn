// LocationFilter.jsx
import React, { useState } from 'react';

const LocationFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const locations = [
    "Harnwell",
    "Pottruck",
    "Harrison",
    "Lauder",
    "Hill",
    "Rodin",
    "Towne Building",
    "Franklin Field",
    "Penn Museum",
    "Fisher Fine Arts Library"
  ];

  const handleLocationChange = (location) => {
    setSelectedLocations(prev => {
      const newSelections = prev.includes(location)
        ? prev.filter(loc => loc !== location)
        : [...prev, location];
      
      onFilterChange(newSelections);
      return newSelections;
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-cred mt-6 text-white px-6 py-4 rounded-4xl focus:outline-none"
      >
        Location
        {selectedLocations.length > 0 && (
          <span className="ml-2 bg-white text-cred px-2 rounded-full text-sm">
            {selectedLocations.length}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-3 max-h-60 overflow-y-auto">
            {locations.map((location) => (
              <div key={location} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={location}
                  checked={selectedLocations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  className="form-checkbox h-4 w-4 text-cred rounded border-gray-300 focus:ring-cred"
                />
                <label htmlFor={location} className="ml-2 mt-4 text-md text-gray-700">
                  {location}
                </label>
              </div>
            ))}
          </div>
          {selectedLocations.length > 0 && (
            <div className="border-t p-2">
              <button
                onClick={() => {
                  setSelectedLocations([]);
                  onFilterChange([]);
                }}
                className="text-sm text-gray-600 hover:text-cred"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationFilter;