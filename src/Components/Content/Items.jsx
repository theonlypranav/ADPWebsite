import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import bgImage from '../../assets/bg.jpg'; // Ensure the correct path to your background image

function Inventory() {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const location = useLocation();
  const { state } = location;
  const userId = state ? state.user_id : null;

  const userString = localStorage.getItem("user");
  const userData = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || (userData && userData.access !== 'bosslevel')) {
      navigate('/inventory');
      return; // Prevent further executions
    }

    const fetchItems = async () => {
      try {
        const response = await fetch(
          'https://adpwebs-a4geehfwhtchdraw.centralindia-01.azurewebsites.net/api/cart/cart-item-summary',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        console.log('Fetched items:', data);

        if (Array.isArray(data)) {
          const sortedData = data.sort((a, b) => {
            if (a.itemName.startsWith("Brush Round")) return -1;
            if (b.itemName.startsWith("Brush Round")) return 1;
  
            if (a.itemName.startsWith("Brush Flat")) return -1;
            if (b.itemName.startsWith("Brush Flat")) return 1;
    
            if (a.itemName.startsWith("Paint (15 ml)")) return -1;
            if (b.itemName.startsWith("Paint (15 ml)")) return 1;
    
            if (a.itemName.startsWith("Paint (500 ml)")) return -1;
            if (b.itemName.startsWith("Paint (500 ml)")) return 1;
    
            return 0; // Other items remain in their default order
          });
          setItems(
            sortedData.map((item) => ({
              id: item._id, // Ensure you include the item ID here
              name: item.itemName,
              availableQuantity: item.availableQuantity,
              totalOrderedQuantity: item.totalOrderedQuantity,
              totalAllottedQuantity: item.totalAllottedQuantity,
              itemOrderedStatus: item.itemOrderedStatus, // Ensure proper initial value
              itemRemark: item.itemRemark,
            }))
          );
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [userId]);

  const handleStatusChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      itemOrderedStatus: value, // Ensure the status is updated
    };
    setItems(updatedItems);
  };

  const handleRemarkChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      itemRemark: value, // Ensure the status is updated
    };
    setItems(updatedItems);
  };

  const handleSave = async () => {
    const updatedItems = items
      .map((item) => ({
        _id: item.id,
        itemOrderedStatus: item.itemOrderedStatus,
        itemRemark: item.itemRemark,
      }))
      ; // Remove items with no changes

    if (updatedItems.length === 0) {
      alert('No changes to save.');
      return;
    }
    try {
      const response = await fetch(
        'https://adpwebs-a4geehfwhtchdraw.centralindia-01.azurewebsites.net/api/inventorys/update-inventory-items',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedItems),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save items');
      }

      window.location.reload();
    } catch (error) {
      console.error('Error saving items:', error);
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

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      items.map((item) => ({
        'Item Name': item.name,
        'Available Quantity': item.availableQuantity,
        'Total Ordered Quantity': item.totalOrderedQuantity,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');

    XLSX.writeFile(wb, 'inventory_items.xlsx');
  };

  return (
    <div
      id='Inventory'
      className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-32 px-5 py-20 min-h-screen flex flex-col items-center'
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className='text-3xl md:text-4xl font-bold mb-6 text-center'>Item List</h1>
  
      {/* Action buttons */}
      <div className='flex flex-col sm:flex-row align-center justify-center w-full mb-8 space-y-4 sm:space-y-0 sm:space-x-4'>
        <Link to='/inventoryadp'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto'>
            Back to Home
          </button>
        </Link>
  
        <button
          onClick={handleDownloadExcel}
          className='bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto'
        >
          Download Excel
        </button>
      </div>
  
      {/* Scrollable table container */}
      <div className='w-full overflow-x-auto rounded-lg shadow-lg border border-blue-400 glow'>
        <table className='min-w-full bg-white dark:bg-gray-800 rounded-lg'>
          <thead>
            <tr className='text-left'>
              <th className='py-2 px-4 border-b text-xs md:text-sm'>Item Name</th>
              <th className='py-2 px-4 border-b text-xs md:text-sm'>Available Quantity</th>
              <th className='py-2 px-4 border-b text-xs md:text-sm'>Total Ordered Quantity</th>
              <th className='py-2 px-4 border-b text-xs md:text-sm'>Total Allotted Quantity</th>
              <th className='py-2 px-4 border-b text-xs md:text-sm'>Status</th>
              <th className='py-2 px-4 border-b text-xs md:text-sm'>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                <td className='py-2 px-4 border-b text-xs md:text-sm'>{item.name}</td>
                <td className='py-2 px-4 border-b text-xs md:text-sm'>{item.availableQuantity}</td>
                <td className='py-2 px-4 border-b text-xs md:text-sm'>{item.totalOrderedQuantity}</td>
                <td className='py-2 px-4 border-b text-xs md:text-sm'>{item.totalAllottedQuantity}</td>
                <td className='py-2 px-4 border-b'>
                  <select
                    className='status-dropdown text-xs md:text-sm'
                    value={item.itemOrderedStatus}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value=''>Select Status</option>
                    <option value='Available'>Available</option>
                    <option value='Not Available'>Not Available</option>
                    <option value='Ordered from Akshay'>Ordered from Akshay</option>
                    <option value='Ordered from Amazon'>Ordered from Amazon</option>
                  </select>
                </td>
                <td className='py-2 px-4 border-b'>
                  <input
                    type='text'
                    className='remarks-input text-xs md:text-sm'
                    value={item.itemRemark}
                    onChange={(e) => handleRemarkChange(index, e.target.value)}
                    placeholder='Enter Remarks'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Save button */}
      <button
        onClick={handleSave}
        className='bg-green-500 text-white px-4 py-2 rounded mt-8 w-full sm:w-auto'
      >
        Save Changes
      </button>
  
      {/* Modal for order details */}
      {modalVisible && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 relative'>
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
  
      <style jsx='true'>{`
        .status-dropdown {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 4px;
          border-radius: 4px;
        }
  
        .remarks-input {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 4px;
          border-radius: 4px;
        }
  
        .glow {
          box-shadow: 0 0 15px rgba(0, 123, 255, 0.6);
        }
      `}</style>
    </div>
  );
  
}

export default Inventory;
