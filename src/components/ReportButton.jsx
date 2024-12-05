import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const ReportButton = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        //change above
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}
    >
      <button
        className="btn btn-danger btn-lg px-9 py-7 text-3xl font-bold shadow-lg hover:scale-105 transition-transform duration-200"
        style={{
          backgroundColor: 'white', // White background by default
          color: '#8C1A11', // Red text
          border: '2px solid #8C1A11', // Red border
          fontFamily: 'Poppins, sans-serif',
          borderRadius: '50px', // Rounded corners
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#8C1A11'; // Change background to red
          e.target.style.color = 'white'; // Change text to white
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'white'; // Revert background to white
          e.target.style.color = '#8C1A11'; // Revert text to red
        }}
        onClick={() => navigate('/upload')} // Navigate to the /upload route
      >
        Report Item
      </button>
    </div>
  );
};

export default ReportButton;