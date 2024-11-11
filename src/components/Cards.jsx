import React from 'react';

const Cards = ({status, item, when, where, photo}) => {
  return (
    <div className="bg-gray-100 w-1/5 h-3/5 rounded-3xl">
      <div className="h-1/7 w-full bg-cblue rounded-t-3xl flex items-center">
        <h1 className="text-left px-5 text-white font-bold text-xl">
          {status}
        </h1>
      </div>
      <p className="text-left p-5 text-l">
        <strong>Item:</strong> {item} <br />
        <strong>When:</strong> {when} <br />
        <strong>Where:</strong> {where} <br />
      </p>
      <img src={photo} alt="item" className="px-6 w-full h-1/2 rounded-xl" />
    </div>
  );
}

export default Cards;
