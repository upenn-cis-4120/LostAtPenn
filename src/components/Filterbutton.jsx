import React, { useState } from 'react';

const Filterbutton = ({ name, color, textcolor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className={`${color} w-36 h-16 my-6 rounded-4xl text-center 
        flex justify-center items-center text-${textcolor} font-bold text-2xl shadow-lg`}
      >
        {name}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-36 bg-white shadow-lg rounded-md">
          <ul className="text-left text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filterbutton;
