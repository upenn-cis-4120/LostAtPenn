import React, { useState } from 'react';

const TypeFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const categories = [
    "Electronics",
    "Clothing",
    "Accessories",
    "SportingGear",
    "AcademicSupplies",
    "Miscellaneous"
  ];

  const handleTypeChange = (category) => {
    setSelectedTypes(prev => {
      const newSelections = prev.includes(category)
        ? prev.filter(type => type !== category)
        : [...prev, category];
      
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
        Type
        {selectedTypes.length > 0 && (
          <span className="ml-2 bg-white text-cred px-2 rounded-full text-sm">
            {selectedTypes.length}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-3 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <div key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedTypes.includes(category)}
                  onChange={() => handleTypeChange(category)}
                  className="form-checkbox h-4 w-4 text-cred rounded border-gray-300 focus:ring-cred"
                />
                <label htmlFor={category} className="ml-2 text-md mt-4 text-gray-700">
                  {category}
                </label>
              </div>
            ))}
          </div>
          {selectedTypes.length > 0 && (
            <div className="border-t p-2">
              <button
                onClick={() => {
                  setSelectedTypes([]);
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

export default TypeFilter;