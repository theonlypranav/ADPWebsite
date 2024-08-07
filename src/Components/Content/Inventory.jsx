import React, { useState } from 'react';

function Inventory() {
  // Initialize an array with 4 items, each having a default quantity of 0
  const [quantities, setQuantities] = useState(Array(4).fill(0));

  const increaseQuantity = (index) => {
    setQuantities(quantities.map((qty, i) => (i === index ? qty + 1 : qty)));
  };

  const decreaseQuantity = (index) => {
    setQuantities(quantities.map((qty, i) => (i === index && qty > 0 ? qty - 1 : qty)));
  };

  return (
    <div
      id='Inventory'
      className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-32 px-5 py-20 min-h-screen flex flex-col items-center'
    >
      <div className="top-transition"></div>
      <div className='text-center w-full flex flex-col items-center mb-10'>
        {/* Title and Subtitle */}
        <h1 className='text-3xl font-bold mb-2 text-silver-700 dark:text-silver-300'>
          Inventory Management
        </h1>
        <h2 className='text-xl font-semibold text-silver-600 dark:text-silver-400'>
          Welcome, CRAC Coordinator
        </h2>
      </div>

      {/* Item Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
        {quantities.map((quantity, index) => (
          <div
            key={index}
            className='bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-md'
          >
            <img
              src='https://via.placeholder.com/150' // Placeholder image URL
              alt='Item'
              className='w-full h-32 object-cover rounded-lg mb-4'
            />
            <div className='flex flex-col items-center'>
              <div className='text-lg font-semibold mb-2'>
                Item Name {index + 1}
              </div>
              <div className='flex items-center mb-4'>
                <button
                  onClick={() => decreaseQuantity(index)}
                  className='bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-3 py-1 rounded-l'
                >
                  -
                </button>
                <div className='w-16 text-center bg-white dark:bg-gray-800 text-black dark:text-white'>
                  {quantity}
                </div>
                <button
                  onClick={() => increaseQuantity(index)}
                  className='bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-3 py-1 rounded-r'
                >
                  +
                </button>
              </div>
              <button
                onClick={() => alert(`Added ${quantity} items to cart`)}
                className='bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300'
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-transition"></div>
    </div>
  );
}

export default Inventory;
