import React, { useState, useEffect } from 'react';
import useAppointments from '../../../hooks/useAppointments';

const AppointmentsModal = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [name, setName] = useState('');
  const [schoolID, setSchoolID] = useState('');
  const [reason, setReason] = useState('');
  
  const { availableSlots, loading, bookingStatus, error, fetchAvailableSlots, bookAppointment } = useAppointments();

  const departments = {
    Offices: ['VC', 'DVC', 'Admissions Office', 'Finance Office'],
    Deans: ['Dean SHSS', 'Dean SCOB', 'Dean SST', 'Dean SPHS', 'Dean Film'],
    'Course Advisors': [
      'Course Advisor SHSS',
      'Course Advisor SCOB',
      'Course Advisor SST',
      'Course Advisor SPHS',
      'Course Advisor Film',
    ],
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedDepartment('');
    setSelectedSlot('');
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setSelectedSlot('');
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSlot('');
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      name,
      school_id: schoolID,
      reason,
      category: selectedCategory,
      department: selectedDepartment,
      time_slot: selectedSlot,
      date: selectedDate,
    };

    const response = await bookAppointment(appointmentData);
    if(response){
      console.log('Booking Success:', response);
      alert("Booking Successful")
      onClose();  // Close modal on success
    } else {
      console.error('Booking failed');
      alert("Booking failed: " + error || 'Unknown error');
    }
   
  };

  useEffect(() => {
    if (selectedDate && selectedDepartment) {
      fetchAvailableSlots(selectedDate, selectedDepartment);
    }
  }, [selectedDate, selectedDepartment, fetchAvailableSlots]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-90" onClick={onClose} />
      <div className="bg-white p-6 rounded-lg z-10 w-11/12 max-w-lg shadow-lg relative max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>

        {/* Display booking status and error */}
        {bookingStatus && (
          <div className="mb-4 text-center text-lg text-green-500">{bookingStatus}</div>
        )}
        {error && (
          <div className="mb-4 text-center text-lg text-red-500">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Category selection */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Select Category</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(departments).map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`w-full text-left border border-gray-300 rounded-lg p-3 hover:bg-indigo-100 ${
                    selectedCategory === category ? 'bg-indigo-200 font-semibold' : ''
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Department selection */}
          {selectedCategory && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Select Department</h3>
              <div className="grid grid-cols-2 gap-2">
                {departments[selectedCategory]?.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    className={`w-full text-left border border-gray-300 rounded-lg p-3 hover:bg-indigo-100 ${
                      selectedDepartment === dept ? 'bg-indigo-200 font-semibold' : ''
                    }`}
                    onClick={() => handleDepartmentSelect(dept)}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Date and Slot selection */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Select Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {selectedDate && availableSlots.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Select Slot</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
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
            </div>
          )}

          {/* Personal Information */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">School ID</label>
            <input
              type="text"
              value={schoolID}
              onChange={(e) => setSchoolID(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !selectedSlot || !name || !schoolID || !reason}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentsModal;
