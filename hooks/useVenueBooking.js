import { useState } from "react";
import { API_ROUTES } from "../src/api";

const useVenueBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a venue booking
  const createBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(API_ROUTES.VENUE_BOOKINGS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: bookingData.name,
          schoolID: bookingData.schoolID,
          reason: bookingData.reason,
          selectedVenue: bookingData.selectedVenue,
          subVenue: bookingData.subVenue,
          date: bookingData.date,  
          time: bookingData.time,  
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create booking");
      }
  
      const data = await response.json();
      return data; 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch all venue bookings
  const fetchBookings = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ROUTES.VENUE_BOOKINGS);
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      return data; 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    fetchBookings,
    loading,
    error,
  };
};

export default useVenueBooking;
