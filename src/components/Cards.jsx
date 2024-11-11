import React from 'react';

const Cards = ({ status, item, when, where, photo }) => {
  return (
    <div className={`bg-gray-100 w-[300px] ${photo ? 'h-[calc(60vh-1rem)]' : 'h-[calc(30vh-1rem)]'} rounded-3xl flex flex-col overflow-hidden shadow-lg`}
         style={{ boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1), -4px 0 15px rgba(0, 0, 0, 0.1), 0 4px 15px rgba(0, 0, 0, 0.1)' }}>
      <div className={`h-28 w-full ${status === 'Lost' ? 'bg-red-500' : 'bg-cblue'} rounded-t-3xl flex items-center justify-center`}>
        <h1 className="text-left px-5 text-white font-bold text-4xl">
          {status}
        </h1>
      </div>

      <div className="text-left px-5 py-8 text-2xl space-y-2">
        <p><strong>Item:</strong> {item}</p>
        <p><strong>When:</strong> {when}</p>
        <p><strong>Where:</strong> {where}</p>
      </div>

      {photo && (
        <div className="px-6 w-full h-1/2 rounded-xl overflow-hidden">
          <img className="w-full h-full object-cover" src={photo} alt="item" />
        </div>
      )}
    </div>
  );
};

export default Cards;
