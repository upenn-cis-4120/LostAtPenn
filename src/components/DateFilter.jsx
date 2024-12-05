import React, { useState } from 'react';

const DateFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isActive, setIsActive] = useState(false);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newDateRange = { ...dateRange, [name]: value };
    setDateRange(newDateRange);

    if (newDateRange.start && newDateRange.end) {
      setIsActive(true);
      onFilterChange(newDateRange);
    } else {
      setIsActive(false);
      onFilterChange({ start: '', end: '' });
    }
  };

  const clearDates = () => {
    setDateRange({ start: '', end: '' });
    setIsActive(false);
    onFilterChange({ start: '', end: '' });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-cred mt-6 text-white px-6 py-4 rounded-4xl focus:outline-none"
      >
        Date
        {isActive && (
          <span className="ml-2 bg-white text-cred px-2 rounded-full text-sm">
            ✓
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4">
            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-1">From:</label>
              <input
                type="date"
                name="start"
                value={dateRange.start}
                onChange={handleDateChange}
                className="w-full p-2 border rounded focus:border-cred focus:ring-1 focus:ring-cred"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-1">To:</label>
              <input
                type="date"
                name="end"
                value={dateRange.end}
                min={dateRange.start} 
                onChange={handleDateChange}
                className="w-full p-2 border rounded focus:border-cred focus:ring-1 focus:ring-cred"
              />
            </div>
            {isActive && (
              <div className="border-t pt-2">
                <button
                  onClick={clearDates}
                  className="text-sm text-gray-600 hover:text-cred"
                >
                  Clear Dates
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;