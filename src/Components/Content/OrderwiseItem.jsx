import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './OrderwiseItem.css';

function OrderwiseItem() {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Get location state which includes `user_id`
  const location = useLocation();
  const { state } = location;
  const userId = state ? state.user_id : null;

  const userString = localStorage.getItem('user');
  const userData = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchItems = async () => {
      if (!userId) return;

      try {
        // Fetch items based on `userId`
        const response = await fetch(`https://adp-backend-bzdrfdhvbhbngbgu.southindia-01.azurewebsites.net/api/cart/cart-items-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        // Log data to verify structure
        console.log('Fetched items:', data);

        // Ensure data is in expected format and map it
        if (Array.isArray(data)) {
          setItems(data.map((item) => ({
            id: item._id,
            name: item.itemName,
            Tdemand: item.ordered_quantity,
            Tavail: item.allotted_quantity,
            addQuantity: '', // Initialize empty or default value
            status: item.status,
            remarks: item.remarks || '', // Default to empty if not provided
          })));
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchItems();
  }, [userId]);

  const handleQuantityChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].addQuantity = value;
    setItems(updatedItems);
  };

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

  const handleSave = async () => {
    // Save functionality goes here
    try {
      const response = await fetch('https://adp-backend-bzdrfdhvbhbngbgu.southindia-01.azurewebsites.net/api/cart/update-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, items }), // Send userId and updated items
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      console.log('Items saved:', items);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

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
      id='OrderwiseItem'
      className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-32 px-5 py-20 min-h-screen flex flex-col items-center'
    >
      <h1 className='text-4xl font-bold mb-6'>Orderwise Item Management</h1>
      
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
            <tr key={item.id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
              <td className='py-2 px-4 border-b'>{item.name}</td>
              <td className='py-2 px-4 border-b'>{item.Tdemand}</td>
              <td className='py-2 px-4 border-b'>{item.Tavail}</td>
              <td className='py-2 px-4 border-b'>
                <input
                  type='text'
                  className='quantity-input'
                  value={item.addQuantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  placeholder='Enter Quantity'
                />
              </td>
              <td className='py-2 px-4 border-b'>
                <select
                  className='status-dropdown'
                  value={item.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="pickup">Ready for Pickup</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td className='py-2 px-4 border-b'>
                <input
                  type='text'
                  className='remarks-input'
                  value={item.remarks}
                  onChange={(e) => handleRemarkChange(index, e.target.value)}
                  placeholder='Enter Remarks'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className='bg-green-500 text-white px-4 py-2 rounded mt-6'
      >
        Save Changes
      </button>

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

export default OrderwiseItem;
