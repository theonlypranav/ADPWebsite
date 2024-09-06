import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inventory.css'; 
import bgImage from '../../assets/bg.jpg'; 

function Inventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [addItemModal, setAddItemModal] = useState(false);
  const [itemsManagerModal, setItemsManagerModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [itemBeingEditedName, setItemBeingEditedName] = useState('');
  const [itemBeingEditedQuantity, setItemBeingEditedQuantity] = useState(0);
  const [itemBeingEditedEnabled, setItemBeingEditedEnabled] = useState(true);

  // Fetch token and user details from localStorage
  const userString = localStorage.getItem('user');
  const userData = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || userData.access !== 'bosslevel') {
      navigate('/inventory');
    } else {
      fetchItems();
    }
  }, [token, navigate]);

  // Fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/inventorys/inventory', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setItems(data);
      } else {
        alert('Failed to fetch items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    if (newItemName.trim() === '') return;

    const newItem = {
      itemQuantity: newItemQuantity,
      itemStatus: 'enabled',
      itemName: newItemName
    };

    try {
      const response = await fetch('https://adp-backend-bzdrfdhvbhbngbgu.southindia-01.azurewebsites.net/api/inventorys/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        fetchItems(); // Refetch items after adding
        setNewItemName('');
        setNewItemQuantity(0);
        setAddItemModal(false);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('An error occurred while adding the item.');
    }
  };

  const deleteItem = async () => {
    if (selectedItemIndex === null) return;

    const itemId = items[selectedItemIndex]._id;
    try {
      const response = await fetch(`http://localhost:5001/api/inventorys/inventory/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchItems(); // Refetch items after deleting
        setItemsManagerModal(false);
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const updateItem = async () => {
    if (selectedItemIndex === null) return;

    const itemId = items[selectedItemIndex]._id;
    const updatedItem = {
      itemName: itemBeingEditedName,
      itemStatus: itemBeingEditedEnabled ? 'enabled' : 'disabled',
      itemQuantity: itemBeingEditedQuantity
    };

    try {
      const response = await fetch(`http://localhost:5001/api/inventorys/inventory/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedItem)
      });

      if (response.ok) {
        fetchItems(); // Refetch items after updating
        setItemsManagerModal(false);
      } else {
        alert('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const closeAddItemModal = () => setAddItemModal(false);
  const closeItemsManagerModal = () => {
    setItemsManagerModal(false);
    setSelectedItemIndex(null);
    setItemBeingEditedName('');
    setItemBeingEditedQuantity(0);
    setItemBeingEditedEnabled(true);
  };

  const handleItemChange = (e) => {
    const index = Number(e.target.value);
    setSelectedItemIndex(index);
    const selectedItem = items[index];
    setItemBeingEditedName(selectedItem.itemName);
    setItemBeingEditedQuantity(selectedItem.itemQuantity);
    setItemBeingEditedEnabled(selectedItem.itemStatus === 'enabled');
  };

  return (
    <div id='Inventory' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-32 px-5 py-20 min-h-screen flex flex-col items-center' style={{
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
          Welcome, {userData?.cordName || 'CRAC Coordinator'}
        </h2>
        <div className='flex space-x-4 mt-4'>
          <button onClick={() => setAddItemModal(true)} className='bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300'>
            Add New Item
          </button>
          <button onClick={() => setItemsManagerModal(true)} className='bg-gradient-to-r from-purple-500 to-purple-700 text-white px-5 py-2 rounded shadow-md hover:from-purple-600 hover:to-purple-800 transition duration-300'>
            Items Manager
          </button>
          <button onClick={() => navigate('/inventory')} className='bg-gradient-to-r from-gray-500 to-gray-700 text-white px-5 py-2 rounded shadow-md hover:from-gray-600 hover:to-gray-800 transition duration-300'>
            Back
          </button>
          <button onClick={() => navigate('/orders')} className='bg-gradient-to-r from-teal-500 to-teal-700 text-white px-5 py-2 rounded shadow-md hover:from-teal-600 hover:to-teal-800 transition duration-300'>
            View All Orders
          </button>
          <button onClick={() => navigate('/items')} className='bg-gradient-to-r from-teal-500 to-teal-700 text-white px-5 py-2 rounded shadow-md hover:from-teal-600 hover:to-teal-800 transition duration-300'>
            Inventory analysis
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mt-8'>
        {items.map((item, index) => (
          <div key={item._id} className='bg-gray-800 dark:bg-gray-900 border border-gray-600 dark:border-gray-700 p-8 rounded-lg shadow-md flex flex-col items-center'>
            <img src='https://via.placeholder.com/200' alt={item.itemName} className='w-48 h-48 object-cover rounded-lg mb-4' />
            <div className='text-lg font-semibold mb-2'>
              {item.itemName || `Item Name ${index + 1}`}
            </div>
            <div className='text-lg'>
              Quantity: {item.itemQuantity}
            </div>
            <div className={`mt-2 text-sm ${item.itemStatus === 'enabled' ? 'text-green-500' : 'text-red-500'}`}>
              Status: {item.itemStatus}
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {addItemModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h3 className='text-2xl font-semibold mb-4'>Add New Item</h3>
            <input type='text' className='border p-2 mb-4 w-full' placeholder='Item Name' value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
            <input type='number' className='border p-2 mb-4 w-full' placeholder='Item Quantity' value={newItemQuantity} onChange={(e) => setNewItemQuantity(Number(e.target.value))} />
            <div className='flex justify-end space-x-4'>
              <button onClick={addItem} className='bg-blue-500 text-white px-4 py-2 rounded'>Add Item</button>
              <button onClick={closeAddItemModal} className='bg-gray-500 text-white px-4 py-2 rounded'>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Items Manager Modal */}
      {itemsManagerModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h3 className='text-2xl font-semibold mb-4'>Manage Item</h3>
            <select className='border p-2 mb-4 w-full' value={selectedItemIndex ?? ''} onChange={handleItemChange}>
              <option value=''>Select an Item</option>
              {items.map((item, index) => (
                <option key={item._id} value={index}>{item.itemName}</option>
              ))}
            </select>
            {selectedItemIndex !== null && (
              <>
                <input type='text' className='border p-2 mb-4 w-full' value={itemBeingEditedName} onChange={(e) => setItemBeingEditedName(e.target.value)} />
                <input type='number' className='border p-2 mb-4 w-full' value={itemBeingEditedQuantity} onChange={(e) => setItemBeingEditedQuantity(Number(e.target.value))} />
                <label className='inline-flex items-center'>
                  <input type='checkbox' checked={itemBeingEditedEnabled} onChange={(e) => setItemBeingEditedEnabled(e.target.checked)} />
                  <span className='ml-2'>Enabled</span>
                </label>
                <div className='flex justify-end space-x-4 mt-4'>
                  <button onClick={updateItem} className='bg-green-500 text-white px-4 py-2 rounded'>Save Changes</button>
                  <button onClick={deleteItem} className='bg-red-500 text-white px-4 py-2 rounded'>Delete Item</button>
                  <button onClick={closeItemsManagerModal} className='bg-gray-500 text-white px-4 py-2 rounded'>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
