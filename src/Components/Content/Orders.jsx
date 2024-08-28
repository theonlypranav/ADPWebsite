import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Inventory() {
  const [items, setItems] = useState([
    { name: 'Club A', coordinator: 'John Doe', contact: '123-456-7890', order: 'Order 1' },
    { name: 'Club B', coordinator: 'Jane Smith', contact: '234-567-8901', order: 'Order 2' },
    { name: 'Club C', coordinator: 'Alice Johnson', contact: '345-678-9012', order: 'Order 3' },
    { name: 'Club D', coordinator: 'Bob Brown', contact: '456-789-0123', order: 'Order 4' },
    { name: 'Club E', coordinator: 'Emily Davis', contact: '567-890-1234', order: 'Order 5' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <div
      id='Inventory'
      className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-32 px-5 py-20 min-h-screen flex flex-col items-center'
    >
      <h1 className='text-4xl font-bold mb-6'>Inventory Management</h1>
      
      {/* Button to link to /inventoryadp */}
      <Link to='/inventoryadp'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded mb-4'>
          Back to Home
        </button>
      </Link>
      
      <table className='min-w-full bg-white dark:bg-gray-800'>
        <thead>
          <tr className='text-left'>
            <th className='py-2 px-4 border-b'>Club Name</th>
            <th className='py-2 px-4 border-b'>Coordinator</th>
            <th className='py-2 px-4 border-b'>Contact</th>
            <th className='py-2 px-4 border-b'>Order</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
              <td className='py-2 px-4 border-b'>{item.name}</td>
              <td className='py-2 px-4 border-b'>{item.coordinator}</td>
              <td className='py-2 px-4 border-b'>{item.contact}</td>
              <td
                className='py-2 px-4 border-b cursor-pointer text-blue-500 hover:underline'
                onClick={() => handleOrderClick(`Order details for ${item.name}`)}
              >
                View Order
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing order details */}
      {modalVisible && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg w-1/3 relative'>
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-gray-500 dark:text-gray-300 text-2xl'
            >
              &times;
            </button>
            <h2 className='text-xl font-semibold mb-4'>Order Details</h2>
            <p>{selectedOrder}</p>
            <button
              onClick={closeModal}
              className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
