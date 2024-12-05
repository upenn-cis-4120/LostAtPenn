import React from 'react';

const StatusFilter = ({ status, isActive, onFilterChange }) => {
  return (
    <button
      onClick={() => onFilterChange(status)}
      className={`mt-6 text-cblue px-6 py-4 rounded-4xl focus:outline-none relative ${
        isActive ? 'bg-cred text-white' : 'bg-lightblue'
      }`}
    >
      {status}
    </button>
  );
};

export default StatusFilter;