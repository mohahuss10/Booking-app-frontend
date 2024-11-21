import React, { useState } from 'react';
import useVenueBooking from '../../../hooks/useVenueBooking';

const VenueModal = ({ isOpen, onClose }) => {
  const { createBooking, loading, error } = useVenueBooking();  // Use the hook to handle booking
  const [selectedVenue, setSelectedVenue] = useState('');
  const [subVenue, setSubVenue] = useState('');
  const [name, setName] = useState('');
  const [schoolID, setSchoolID] = useState('');
  const [reason, setReason] = useState('');
  const [showSubVenueMenu, setShowSubVenueMenu] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const venues = {
    Auditorium: [],
    SHSS: ['Rooftop', 'LT7', 'LT8'],
    'Students Centre': ['TV room 1', 'TV room 2', 'Boardroom'],
    'School of Business': ['LT1', 'LT2', 'B3', 'B1'],
    'Computer Labs': ['GLAB', 'Lab 4', 'Microsoft Lab', 'Lab 2'],
    'Parking Lots': ['PK A', 'PK B', 'PK C'],
  };

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
    setSubVenue('');
    setShowSubVenueMenu(venues[venue].length > 0); // Show sub-venue menu if there are sub-venues
  };

  const handleSubVenueSelect = (sub) => {
    setSubVenue(`${selectedVenue} - ${sub}`);
    setShowSubVenueMenu(false); // Close the sub-venue menu after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the booking data object
    const bookingData = {
      name,
      schoolID,
      reason,
      selectedVenue,
      subVenue,
      date,
      time,
    };

    // Call the hook to handle the booking
    const response = await createBooking(bookingData);

    if (response) {
      console.log('Booking Success:', response);
      alert("Booking Successful")
      onClose();  // Close modal on success
    } else {
      console.error('Booking failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-90" onClick={onClose} />
      <div className="bg-white py-6 px-20 rounded-lg z-10 md:w-[900px] w-[380px]  shadow-lg relative max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Select Venue</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mb-4">
            {Object.keys(venues).map((venue) => (
              <div key={venue} className="flex flex-col relative">
                <button
                  type="button"
                  className={`w-full text-left border border-gray-300 rounded-lg p-3  hover:bg-indigo-100 ${selectedVenue === venue ? 'bg-indigo-600 font-semibold' : ''}`}
                  onClick={() => handleVenueSelect(venue)}
                >
                  {venue}
                </button>

                {selectedVenue === venue && showSubVenueMenu && venues[venue].length > 0 && (
                  <div className="absolute w-max left-0 right-0 top-full bg-gray-100 shadow-lg z-20 mt-1 p-4 rounded">
                    <h3 className="text-md font-semibold mb-2">Choose a location within {venue}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {venues[venue].map((sub) => (
                        <button
                          key={sub}
                          type="button"
                          className={`w-full text-left border border-gray-300 rounded-lg p-2 hover:bg-indigo-100 ${subVenue === `${venue} - ${sub}` ? 'bg-indigo-200 font-semibold' : ''}`}
                          onClick={() => handleSubVenueSelect(sub)}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="md:flex gap-10">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="schoolID">School ID</label>
              <input
                type="text"
                id="schoolID"
                value={schoolID}
                onChange={(e) => setSchoolID(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="reason">Reason for Booking</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div className="md:flex gap-10">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500 transition duration-200"
            disabled={loading || !selectedVenue || (venues[selectedVenue].length > 0 && !subVenue) || !date || !time}
          >
            {loading ? 'Booking...' : 'Book Venue'}
          </button>

          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>

        <div className="mt-4">
          {selectedVenue && (
            <div className="text-gray-700">
              <p className="font-semibold">Selected Venue: {selectedVenue}</p>
              {subVenue && <p className="font-semibold">Selected Sub-Venue: {subVenue}</p>}
            </div>
          )}
        </div>

        <button className="mt-4 text-indigo-600" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default VenueModal;
