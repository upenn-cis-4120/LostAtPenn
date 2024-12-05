import React from 'react';

const Cards = ({ status, item, when, where, photo, comments, category, email, onClick }) => {
  return (
    <div
      className={`bg-gray-100 w-[300px] ${photo ? 'h-[calc(60vh-1rem)]' : 'h-[calc(30vh-1rem)]'} rounded-3xl flex flex-col overflow-hidden shadow-lg transition-transform transform hover:scale-105`}
      style={{
        boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1), -4px 0 15px rgba(0, 0, 0, 0.1), 0 4px 15px rgba(0, 0, 0, 0.1)',
      }}
      onClick={onClick}
    >
      <div className={`h-28 w-full ${status === 'Lost' ? 'bg-cred' : 'bg-cblue'} rounded-t-3xl flex items-center`}>
        <h1 className="text-left px-10 text-white font-bold text-4xl">
          {status}
        </h1>
      </div>

      <div className="text-left px-5 py-8 text-2xl space-y-2">
        <p><strong>Item:</strong> {item}</p>
        <p><strong>When:</strong> {when}</p>
        <p><strong>Where:</strong> {where}</p>
        {category && <p><strong>Category:</strong> {category}</p>}
        {comments && <p><strong>Comments:</strong> {comments}</p>}
        {email && (
          <p>
            <strong>{status === 'Lost' ? 'If Found Contact:' : 'If Lost Contact:'}</strong>{' '}
            <a href={`mailto:${email}`} className="text-cblue underline hover:text-cred">
              {email}
            </a>
          </p>
        )}
      </div>

      {photo && (
        <div className="px-6 mb-6 w-full h-1/2 rounded-xl overflow-hidden">
          <img className="w-full h-full object-cover" src={photo} alt="item" />
        </div>
      )}
    </div>
  );
};

export default Cards;