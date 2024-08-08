import React from 'react';
import { useNavigate } from 'react-router-dom';

function Inventory() {
  const navigate = useNavigate();

  return (
    <div className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-32 px-5 py-20 min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold mb-12 text-center'>
        Inventory Management
      </h1>
      <div className='space-y-6'>
        <button
          onClick={() => navigate('/inventoryadp')}
          className='bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition duration-300 transform hover:scale-105'
        >
          Go to Inventory Home
        </button>
        <button
          onClick={() => navigate('/inventoryuser')}
          className='bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-3 rounded-lg shadow-lg hover:from-green-700 hover:to-green-900 transition duration-300 transform hover:scale-105'
        >
          Go to Another Page
        </button>
      </div>
    </div>
  );
}

export default Inventory;
