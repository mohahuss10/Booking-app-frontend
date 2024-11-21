// TransportModal.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InSchool from './InSchool';
import OutsideSchool from './OutsideSchool';


const TransportModal = ({ isOpen, onClose }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [transportType, setTransportType] = useState('');

  useEffect(() => {
    if (!isOpen) {
      resetForm(); // Reset form when modal is closed
    }
  }, [isOpen]);

  const resetForm = () => {
    setTransportType('');
    setFormVisible(false);
  };

  const handleTransportTypeSelect = (type) => {
    setTransportType(type);
    setFormVisible(true);
  };

  const handleClose = () => {
    resetForm(); // Reset the form when closing
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-black opacity-90" onClick={handleClose} />
      <div className="bg-gray-200 p-5 rounded-md z-10 max-h-[80vh] w-[380px] md:w-[450px] overflow-y-auto">
        {!isFormVisible ? (
          <>
            <h2 className="text-2xl font-bold mb-8">Select Transport Type</h2>
            <div className="flex gap-4">
              <button
                onClick={() => handleTransportTypeSelect('within')}
                className="text-black px-4 py-2 rounded bg-white hover:transform hover:scale-105 hover:transition hover:ease-in-out duration-300"
              >
                <div className='flex justify-center'>
                  <img src="images/scooter1.png" alt="scooter" className='w-[90px]' />
                </div>
                <p className='mt-5 font-semibold text-gray-700'>Transport Within School</p>
              </button>
              <button
                onClick={() => handleTransportTypeSelect('outside')}
                className="text-black px-4 py-2 rounded bg-white hover:transform hover:scale-105 hover:transition hover:ease-in-out duration-300"
              >
                <div className='flex justify-center'>
                  <img src="images/bus.png" alt="bus" className='w-[90px]' />
                </div>
                <p className='mt-5 font-semibold text-gray-700'>Transport Outside School</p>
              </button>
            </div>
          </>
        ) : (
          <div className="mt-4">
            {transportType === 'within' && <InSchool onClose={handleClose} />}
            {transportType === 'outside' && <OutsideSchool onClose={handleClose} />}
          </div>
        )}
        <button className="mt-10 text-blue-500" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default TransportModal;
