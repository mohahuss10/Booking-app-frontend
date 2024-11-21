import React, { useState, useEffect } from 'react';
import usePitchBooking from '../../../hooks/usePitchBooking';



const SportsPitchModal = ({ isOpen, onClose }) => {
  const [selectedPitch, setSelectedPitch] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [name, setName] = useState('');
  const [schoolID, setSchoolID] = useState('');
  const [reason, setReason] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const { availableSlots, error, fetchAvailableSlots, bookPitch, bookingStatus } = usePitchBooking();

  // Fetch available slots when pitch and date are selected
  useEffect(() => {
    if (selectedPitch && selectedDate) {
      setIsFetching(true);
      fetchAvailableSlots(selectedPitch, selectedDate)
        .finally(() => setIsFetching(false)); // Reset fetching flag after the fetch
    }
  }, [selectedPitch, selectedDate, fetchAvailableSlots]);

  // List of sports pitches
  const pitches = [
    'Basketball',
    'Hockey Pitch',
    'Football Pitch',
    'Rugby Pitch',
    'Swimming Pool',
    'Taekwondo',
  ];

  // Handle pitch selection
  const handlePitchSelect = (pitch) => {
    setSelectedPitch(pitch);
    setSelectedSlot('');
  };

  // Handle time slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      name,
      school_id: schoolID,
      reason,
      pitch_name: selectedPitch,
      slot: selectedSlot,
      date: selectedDate,
    };

    const response = await bookPitch(bookingData);
    if(response){
      console.log('Booking Success:', response);
      alert("Booking Successful")
      onClose();  // Close modal on success
    } else {
      console.error('Booking failed');
      alert("Booking failed: " + error || 'Unknown error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-90" onClick={onClose} />
      <div className="bg-white p-6 rounded-lg z-10 md:w-[700px] w-[380px] shadow-lg relative max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Select Sports Pitch</h2>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}
        {bookingStatus && !error && <p className="text-green-500">{bookingStatus}</p>}

        <form onSubmit={handleSubmit}>
          {/* Sports pitch selection */}
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mb-4">
            {pitches.map((pitch) => (
              <button
                key={pitch}
                type="button"
                className={`w-full text-left border border-gray-300 rounded-lg p-3 hover:bg-indigo-100 ${
                  selectedPitch === pitch ? 'bg-indigo-200 font-semibold' : ''
                }`}
                onClick={() => handlePitchSelect(pitch)}
              >
                {pitch}
              </button>
            ))}
          </div>

          {/* Date selection */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="date">Select a Date</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          {/* Slot selection */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Select a Time Slot</label>
            {isFetching ? (
              <p>Loading available slots...</p>
            ) : availableSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`w-full text-left border border-gray-300 rounded-lg p-3 hover:bg-indigo-100 ${
                      selectedSlot === slot ? 'bg-indigo-200 font-semibold' : ''
                    }`}
                    onClick={() => handleSlotSelect(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <p>No available slots for the selected date and pitch.</p>
            )}
          </div>

          {/* Booking details */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
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
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="reason">Reason for Booking</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Book Pitch
          </button>
        </form>
      </div>
    </div>
  );
};

export default SportsPitchModal;
