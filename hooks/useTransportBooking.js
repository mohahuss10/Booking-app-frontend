// hooks/useTransportBooking.js
import { useCallback, useState } from 'react';
import { API_ROUTES } from '../src/api';




const useTransportBooking = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [remainingScooters, setRemainingScooters] = useState(null);
    const [remainingSeats, setRemainingSeats] = useState(null);

    const bookTransport = async (bookingData) => {
        setError(null); // Reset error state
        setSuccess(false); // Reset success state

        try {
            const response = await fetch(API_ROUTES.TRANSPORT_INSIDE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Booking created:', data);
            setSuccess(true); // Set success state if the booking is created
            return {success: true, data}; // Return the booking data if needed
        } catch (error) {
            setError(error.message); // Set error message if there is an error
            console.error('Error creating booking:', error);
            return {success: false, error:error.message};
        }
    };

    const fetchRemainingScooters = useCallback(async (date) => {
        try {
            const response = await fetch(`${API_ROUTES.SCOOTER_AVAILABILITY}?date=${date}`);
            const data = await response.json();

            if (response.ok) {
                setRemainingScooters(data.remaining_scooters);
            } else {
                setError('Failed to fetch scooter availability');
            }
        } catch (error) {
            setError('An error occurred while fetching scooter availability');
            console.error(error);
        }
    }, []);


    //transport outside
    const bookTransportOutside = async (bookingData) => {
        setError(null); // Reset error state
        setSuccess(false); // Reset success state

        try {
            const response = await fetch(API_ROUTES.TRANSPORT_OUTSIDE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Booking created:', data);
            setSuccess(true); // Set success state if the booking is created
            return {success: true, data}; // Return the booking data if needed
        } catch (error) {
            setError(error.message); // Set error message if there is an error
            console.error('Error creating booking:', error);
            return {success: false, error:error.message};
        }
    };

    const fetchRemainingSeats = useCallback(async (date) => {
        try {
            const response = await fetch(`${API_ROUTES.BUS_AVAILABILITY}?date=${date}`);
            const data = await response.json();

            if (response.ok) {
                setRemainingSeats(data.remaining_seats);
            } else {
                setError('Failed to fetch seats availability');
            }
        } catch (error) {
            setError('An error occurred while fetching seats availability');
            console.error(error);
        }
    }, []);


    return { bookTransport, error, success, fetchRemainingScooters, remainingScooters, bookTransportOutside, fetchRemainingSeats, remainingSeats };
};

export default useTransportBooking;
