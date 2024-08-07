import React, { useState } from 'react';

function Inventory() {
  const [quantities, setQuantities] = useState(Array(4).fill(0));
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [modal, setModal] = useState({ visible: false, item: '', quantity: 0 });

  const increaseQuantity = (index) => {
    setQuantities(quantities.map((qty, i) => (i === index ? qty + 1 : qty)));
  };

  const decreaseQuantity = (index) => {
    setQuantities(quantities.map((qty, i) => (i === index && qty > 0 ? qty - 1 : qty)));
  };

  const addToCart = (index) => {
    const item = `Item ${index + 1}`;
    const quantity = quantities[index];
    if (quantity > 0) {
      setCart([...cart, { item, quantity }]);
      setQuantities(quantities.map((qty, i) => (i === index ? 0 : qty)));
      setModal({ visible: true, item, quantity });
    }
  };

  const clearCart = () => {
    setCart([]);
    setShowCart(false);
  };

  const closeModal = () => {
    setModal({ ...modal, visible: false });
  };

  return (
    <div
      id='Inventory'
      className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-32 px-5 py-20 min-h-screen flex flex-col items-center'
    >
      <div className="top-transition"></div>
      <div className='text-center w-full flex flex-col items-center mb-12'>
        <h1 className='text-4xl font-bold mb-2 text-silver-700 dark:text-silver-300'>
          Inventory Management
        </h1>
        <h2 className='text-xl font-semibold text-silver-600 dark:text-silver-400'>
          Welcome, CRAC Coordinator
        </h2>
        <div className='flex space-x-4 mt-4'>
          <button
            onClick={() => setShowCart(!showCart)}
            className='bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-2 rounded shadow-md hover:from-green-600 hover:to-green-800 transition duration-300'
          >
            {showCart ? 'Hide Cart' : 'View Cart'}
          </button>
          <button
            onClick={clearCart}
            className='bg-gradient-to-r from-red-500 to-red-700 text-white px-5 py-2 rounded shadow-md hover:from-red-600 hover:to-red-800 transition duration-300'
          >
            Clear Cart
          </button>
        </div>
      </div>

      {showCart && (
        <div className='w-full max-w-6xl mt-6 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-x-auto'>
          <h3 className='text-2xl font-bold mb-4'>Cart Items</h3>
          <table className='min-w-full bg-white dark:bg-gray-900 rounded-lg'>
            <thead className='bg-gray-300 dark:bg-gray-700'>
              <tr>
                <th className='py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300'>Item</th>
                <th className='py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300'>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="2" className='py-4 px-4 text-center text-gray-600 dark:text-gray-300'>
                    No items in cart
                  </td>
                </tr>
              ) : (
                cart.map((item, index) => (
                  <tr key={index}>
                    <td className='py-2 px-4 border-b text-gray-800 dark:text-gray-100'>{item.item}</td>
                    <td className='py-2 px-4 border-b text-gray-800 dark:text-gray-100'>{item.quantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mt-8'>
        {quantities.map((quantity, index) => (
          <div
            key={index}
            className='bg-gray-800 dark:bg-gray-900 border border-gray-600 dark:border-gray-700 p-8 rounded-lg shadow-md flex flex-col items-center'
          >
            <img
              src='https://via.placeholder.com/200'
              alt='Item'
              className='w-48 h-48 object-cover rounded-lg mb-4'
            />
            <div className='text-lg font-semibold mb-2'>
              Item Name {index + 1}
            </div>
            <div className='flex items-center mb-4'>
              <button
                onClick={() => decreaseQuantity(index)}
                className='bg-gray-600 dark:bg-gray-800 text-white px-4 py-2 rounded-l'
              >
                -
              </button>
              <div className='w-20 text-center text-white'>
                {quantity}
              </div>
              <button
                onClick={() => increaseQuantity(index)}
                className='bg-gray-600 dark:bg-gray-800 text-white px-4 py-2 rounded-r'
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(index)}
              className='bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300'
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {modal.visible && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center'>
          <div className='bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg w-1/3'>
            <h3 className='text-xl font-semibold mb-4'>
              Item Added
            </h3>
            <p className='mb-4'>
              You have added {modal.quantity} {modal.item}(s) to your cart.
            </p>
            <button
              onClick={closeModal}
              className='bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded shadow-md hover:from-red-600 hover:to-red-800 transition duration-300'
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bottom-transition"></div>
    </div>
  );
}

export default Inventory;
