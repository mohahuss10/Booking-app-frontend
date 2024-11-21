// src/components/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will navigate to the previous page in the history stack
  };

  return (
    <button
      onClick={goBack}
      className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
    >
      Go Back
    </button>
  );
};

export default BackButton;
