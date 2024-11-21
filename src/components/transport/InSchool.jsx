import React, { useEffect, useState } from 'react';
import useTransportBooking from '../../../hooks/useTransportBooking';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const InSchool = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [route, setRoute] = useState('');
  const [scooterCount, setScooterCount] = useState(1);
  

  const { bookTransport, error, success, remainingScooters, fetchRemainingScooters, } = useTransportBooking();

  useEffect(() => {
    if (selectedDate) {
        fetchRemainingScooters(selectedDate);
    }
}, [selectedDate, fetchRemainingScooters]);

const handleDateChange = (e) => {
  setSelectedDate(e.target.value);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
        name,
        school_id: schoolId,
        route,
        date: selectedDate,
        time: selectedTime,
        scooter_count: scooterCount,
    };

    const response = await bookTransport(bookingData);
        if (response.success) {
            alert('Booking successful!')
            onClose(); 
        } else {
            alert('Booking failed. Please try again.');
        }
};

  return (
    <form onSubmit={handleSubmit} className=''>
      <h2 className="text-2xl font-bold mb-4">Book Transport - Within School</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Booking Successful</p>}
      <div className="mt-3 flex gap-4">
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
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <DatePicker
            selected={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="mt-1 w-full border-gray-300 rounded-md px-2 py-1"
            placeholderText="Select a time"
            required
          />
        </div>
      </div>
      {remainingScooters !== null && (
                <p>Remaining scooters for the date: {remainingScooters}</p>
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
          <option>Gate A to Humanities</option>
          <option>Gate A to Students Centre</option>
          <option>Gate A to Gate B</option>
          <option>Gate B to Gate A</option>
          <option>Gate B to Lilian Beam</option>
          <option>Gate A to Hockey Pitch</option>
        </select>
      </div>

      <div className="mt-3">
                <label htmlFor="scooterCount" className="block text-sm font-medium text-gray-700">Number of Scooters</label>
                <input
                    type="number"
                    id="scooterCount"
                    value={scooterCount}
                    onChange={(e) => setScooterCount(e.target.value)}
                    min="1"
                    className="mt-1 w-full border-gray-300 rounded-md px-2 py-1"
                    required
                />
            </div>
      
      <button type="submit" className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded">Book Transport</button>
    </form>
  );
};

export default InSchool;
