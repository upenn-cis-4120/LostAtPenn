import React from 'react'

const InlineRadioButtons = ({ selectedStatus, onStatusChange }) => {
  return (
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input
        type="radio"
        className="btn-check"
        name="status"
        id="lostRadio"
        checked={selectedStatus === 'lost'}
        onChange={() => onStatusChange('lost')}
        style={{ display: 'none' }} // Hide the actual radio button
      />
      <label 
        className="btn" 
        htmlFor="lostRadio" 
        style={{
          borderColor: '#011F5B',
          color: '#011F5B',
          backgroundColor: selectedStatus === 'lost' ? '#011F5B' : 'transparent',
          color: selectedStatus === 'lost' ? 'white' : '#011F5B',
        }}
      >
        I Lost This
      </label>

      <input
        type="radio"
        className="btn-check"
        name="status"
        id="foundRadio"
        checked={selectedStatus === 'found'}
        onChange={() => onStatusChange('found')}
        style={{ display: 'none' }} // Hide the actual radio button
      />
      <label 
        className="btn" 
        htmlFor="foundRadio" 
        style={{
          borderColor: '#011F5B',
          color: '#011F5B',
          backgroundColor: selectedStatus === 'found' ? '#011F5B' : 'transparent',
          color: selectedStatus === 'found' ? 'white' : '#011F5B',
        }}
      >
        I Found This
      </label>
    </div>
  )
}

export default InlineRadioButtons
