import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/bg.jpg'; 

function Inventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState(Array(4).fill(null).map(() => ({ name: '', quantity: 0 })));
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCompleteOrderModal, setShowCompleteOrderModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [itemBeingEditedName, setItemBeingEditedName] = useState('');
  const [itemBeingEditedQuantity, setItemBeingEditedQuantity] = useState(0);
  const [notification, setNotification] = useState('');

  const updateItem = () => {
    if (selectedItemIndex === null) return;
    setItems(prevItems =>
      prevItems.map((item, index) =>
        index === selectedItemIndex
          ? { name: itemBeingEditedName, quantity: itemBeingEditedQuantity }
          : item
      )
    );
    setItemBeingEditedName('');
    setItemBeingEditedQuantity(0);
    setSelectedItemIndex(null);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantity = Math.max(0, Number(value));
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const incrementQuantity = (index) => {
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (index) => {
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
    );
  };

  const addToCart = (index) => {
    const item = items[index];
    if (item.quantity > 0) {
      setCart(prevCart => [...prevCart, { name: item.name, quantity: item.quantity }]);
      setItems(prevItems =>
        prevItems.map((item, i) =>
          i === index ? { ...item, quantity: 0 } : item
        )
      );
      setNotification('Added to Cart');
      setTimeout(() => setNotification(''), 2000);
    }
  };

  const clearCart = () => {
    setCart([]);
    setShowCart(false);
  };

  const placeOrder = () => {
    alert('Order Placed');
    clearCart();
    setShowCompleteOrderModal(false);
  };

  return (
    <div
      id='Inventory'
      className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-32 px-5 py-20 min-h-screen flex flex-col items-center'
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat' 
      }}>
    
      <div className="top-transition"></div>
      <div className='text-center w-full flex flex-col items-center mb-12'>
        <h1 className='text-4xl font-bold mb-2 text-silver-700 dark:text-silver-300'>
          Inventory Management
        </h1>
        <h2 className='text-xl font-semibold text-silver-600 dark:text-silver-400'>
          Welcome, CRAC Coordinator
        </h2>
        <p className='text-sm text-gray-600 dark:text-gray-400 mt-2 text-justify'>
          For any queries, contact Krish Vora, Ayush Jain
        </p>
        <div className='flex space-x-4 mt-4'>
          <button
            onClick={() => setShowCart(!showCart)}
            className='bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded shadow-md hover:from-green-600 hover:to-green-800 transition duration-300'
          >
            {showCart ? 'Hide Cart' : 'View Cart'}
          </button>
          <button
            onClick={clearCart}
            className='bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded shadow-md hover:from-red-600 hover:to-red-800 transition duration-300'
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate('/inventory')}
            className='bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300'
          >
            Back
          </button>
          <button
            onClick={() => setShowCompleteOrderModal(true)}
            className='bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-2 rounded shadow-md hover:from-purple-600 hover:to-purple-800 transition duration-300'
          >
            Complete Order
          </button>
        </div>
      </div>

      {notification && (
        <div className='fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg'>
          {notification}
        </div>
      )}

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
                    <td className='py-2 px-4 border-b text-gray-800 dark:text-gray-100'>{item.name}</td>
                    <td className='py-2 px-4 border-b text-gray-800 dark:text-gray-100'>{item.quantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showCompleteOrderModal && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center'>
          <div className='bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg w-1/3'>
            <h3 className='text-xl font-semibold mb-4'>
              Cart Items
            </h3>
            <table className='min-w-full bg-gray-200 dark:bg-gray-800 rounded-lg'>
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
                      <td className='py-2 px-4 border-b text-gray-800 dark:text-gray-100'>{item.name}</td>
                      <td className='py-2 px-4 border-b text-gray-800 dark:text-gray-100'>{item.quantity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className='flex justify-end space-x-4 mt-4'>
              <button
                onClick={placeOrder}
                className='bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded shadow-md hover:from-green-600 hover:to-green-800 transition duration-300'
              >
                Place Order
              </button>
              <button
                onClick={() => setShowCompleteOrderModal(false)}
                className='bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded shadow-md hover:from-red-600 hover:to-red-800 transition duration-300'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='grid grid-cols-4 gap-8 w-full'>
        {items.map((item, index) => (
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
              {item.name || `Item Name ${index + 1}`}
            </div>
            <div className='flex items-center mb-4'>
              <button
                onClick={() => decrementQuantity(index)}
                className='bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-2 py-1 rounded-l'
              >
                -
              </button>
              <input
                type='number'
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                className='w-12 text-black text-center bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-center'
                style={{ color: 'white', appearance: 'none' }} // Hide the spinner controls
              />
              <button
                onClick={() => incrementQuantity(index)}
                className='bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-2 py-1 rounded-r'
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(index)}
              className='bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded shadow-md hover:from-green-600 hover:to-green-800 transition duration-300'
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
