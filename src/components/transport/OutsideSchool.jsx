import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTransportBooking from '../../../hooks/useTransportBooking';


const OutsideSchool = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [route, setRoute] = useState('');
  const [busSeats, setBusSeats ] = useState(null)


  const {bookTransportOutside, error, success, remainingSeats, fetchRemainingSeats} = useTransportBooking()

  useEffect(() => {
    if (selectedDate) {
        fetchRemainingSeats(selectedDate);
    }
}, [selectedDate, fetchRemainingSeats]);

const handleDateChange = (e) => {
  setSelectedDate(e.target.value);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
        name,
        school_id: schoolId,
        destination: route,
        date: selectedDate,
        bookedSeats: busSeats,
    };

    const response = await bookTransportOutside(bookingData);
        if (response.success) {
            alert('Booking successful!')
            onClose(); 
        } else {
            alert('Booking failed. Please try again.');
        }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Book Transport - Outside School</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Booking Successful</p>}
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

          {remainingSeats !== null && (
                <p>Remaining seats for the date: {remainingSeats}</p>
            )}
        
      <div> 
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full border-gray-300 rounded-md px-2 py-1"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="schoolId" className="block text-sm font-medium text-gray-700">School ID</label>
        <input
          type="text"
          id="schoolId"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          className="mt-1 w-full border-gray-300 rounded-md px-2 py-1"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="route" className="block text-sm font-medium text-gray-700">Choose a route</label>
        <select
          id="route"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          className="mt-1 w-full border-gray-300 rounded-md px-2 py-1"
          required
        >
          <option value="">Select a route</option>
          <option>Parklands</option>
          <option>Lavington</option>
          <option>Ngara</option>
          <option>CBD</option>
        </select>
      </div>

      <div className="mt-3">
  <label htmlFor="busSeats" className="block text-sm font-medium text-gray-700">Number of Seats</label>
  <input
    type="number"
    id="busSeats"
    value={busSeats || ''}  // Ensure that it's not null
    onChange={(e) => setBusSeats(e.target.value)}
    className="mt-1 w-full border-gray-300 rounded-md px-2 py-1"
    min="1"
    max={remainingSeats || 30}  // Limit to available seats
    required
  />
</div>
      
      
        
     
      <button type="submit" className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded">Book Transport</button>
    </form>
  );
};

export default OutsideSchool;
