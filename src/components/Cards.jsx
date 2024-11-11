import React from 'react';

const Cards = ({ status, item, when, where, photo }) => {
  return (
    <div className={`bg-gray-100 w-[300px] ${photo ? 'h-[calc(60vh-1rem)]' : 'h-[calc(30vh-1rem)]'} rounded-3xl flex flex-col overflow-hidden shadow-lg`}>
      <div className={`h-28 w-full ${status === 'Lost' ? 'bg-red-500' : 'bg-cblue'} rounded-t-3xl flex items-center justify-center`}>
        <h1 className="text-left px-5 text-white font-bold text-xl">
          {status}
        </h1>
      </div>

      <p className="text-left p-5 text-l">
        <strong>Item:</strong> {item} <br />
        <strong>When:</strong> {when} <br />
        <strong>Where:</strong> {where} <br />
      </p>

      {photo && (
        <div className="px-6 w-full h-1/2 rounded-xl overflow-hidden">
          <img className="w-full h-full object-cover" src={photo} alt="item" />
        </div>
      )}
    </div>
  );
};

export default Cards;
