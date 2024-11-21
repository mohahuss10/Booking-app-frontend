
const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const API_ROUTES = {
    TRANSPORT_INSIDE: `${API_BASE_URL}/transport/inside`,
    SCOOTER_AVAILABILITY: `${API_BASE_URL}/transport/inside/availability` ,
    TRANSPORT_OUTSIDE: `${API_BASE_URL}/transport/outside`,
    BUS_AVAILABILITY: `${API_BASE_URL}/transport/outside/availability` ,
    VENUE_BOOKINGS: `${API_BASE_URL}/venue_bookings`,
    AVAILABLE_SLOTS: `${API_BASE_URL}/available_slots`,  
    BOOK_PITCH: `${API_BASE_URL}/book_pitch`,  
    BOOK_APPOINTMENT: `${API_BASE_URL}/book_appointment`, 
    AVAILABLE_APPOINTMENTS: `${API_BASE_URL}/available_appointments`,
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/signup`
};
