import { useState, useCallback } from 'react';
import { API_ROUTES } from '../src/api';

const useAppointments = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null); // To track booking status
  const [error, setError] = useState(null); // To track errors

  // Memoize fetchAvailableSlots to prevent it from changing on every render
  const fetchAvailableSlots = useCallback(async (department, date) => {
    setBookingStatus(null);
    setError(null);
    try {
      const response = await fetch(`${API_ROUTES.AVAILABLE_APPOINTMENTS}/${department}/${date}`);
      const data = await response.json();

      if (response.ok) {
        setAvailableSlots(data.available_slots);
        setError(null); // Clear any previous errors
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred while fetching available slots.');
    }
  }, []); 

  // Function to book a pitch
  const bookAppointment = async (bookingData) => {
    try {
      const response = await fetch(API_ROUTES.BOOK_APPOINTMENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setBookingStatus('Booking successful!');
        setError(null); // Clear any previous errors
        return data;  // Return data indicating success
      } else {
        setBookingStatus(data.message);
        setError(data.message); // Set error if something goes wrong
        return null; // Return null if booking failed
      }
    } catch (err) {
      setBookingStatus('An error occurred while booking the pitch.');
      setError('An error occurred while booking the pitch.');
      return null;
    }
  };
  

  return {
    availableSlots,
    bookingStatus,
    error,
    fetchAvailableSlots,
    bookAppointment
  };
};

export default useAppointments;
