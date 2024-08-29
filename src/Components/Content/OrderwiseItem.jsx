import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './OrderwiseItem.css';

function Inventory() {
  const [items, setItems] = useState([
    { name: 'Item 1', Tdemand: 10, Tavail: 20 },
    { name: 'Item 1', Tdemand: 10, Tavail: 20 },
    { name: 'Item 1', Tdemand: 10, Tavail: 20 },
   
  ]);

  const handleStatusChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].status = value;
    setItems(updatedItems);
  };
  
  const handleRemarkChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].remarks = value;
    setItems(updatedItems);
  };
  

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
      <h1 className='text-4xl font-bold mb-6'>Item List</h1>
      
      {/* Button to link to /inventoryadp */}
      <Link to='/inventoryadp'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded mb-4'>
          Back to Home
        </button>
      </Link>
      
      <table className='min-w-full bg-white dark:bg-gray-800'>
        <thead>
          <tr className='text-left'>
            <th className='py-2 px-4 border-b'>Item</th>
            <th className='py-2 px-4 border-b'>Items Required</th>
            <th className='py-2 px-4 border-b'>Given Quantity</th>
            <th className='py-2 px-4 border-b'>Add Quantity</th>
            <th className='py-2 px-4 border-b'>Status</th>
            <th className='py-2 px-4 border-b'>Remarks</th>
          </tr>
    
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
              <td className='py-2 px-4 border-b'>{item.name}</td>
              <td className='py-2 px-4 border-b'>{`Coordinator ${index + 1}`}</td>
              <td className='py-2 px-4 border-b'>{`Contact ${index + 1}`}</td>
             
              <td className='py-2 px-4 border-b'>
                <select
                  className='status-dropdown'
                  value={item.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="pickup">Ready for Pickup</option>
                  <option value="rejected">Rejected</option>
                  <option value="amazon">Add Amazon Link</option>
                </select>
              </td>
              <td className='py-2 px-4 border-b'>
                <input
                  type='text'
                  className='remarks-input'
                  value={item.remarks}
                  onChange={(e) => handleRemarkChange(index, e.target.value)}
                />
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
