import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inventory.css'; // Ensure this includes styles for the tick button

function Inventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState(Array(4).fill(null).map(() => ({ name: '', quantity: 0, enabled: true })));
  const [addItemModal, setAddItemModal] = useState(false);
  const [itemsManagerModal, setItemsManagerModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [itemBeingEditedName, setItemBeingEditedName] = useState('');
  const [itemBeingEditedQuantity, setItemBeingEditedQuantity] = useState(0);
  const [itemBeingEditedEnabled, setItemBeingEditedEnabled] = useState(true);

  const addItem = () => {
    if (newItemName.trim() === '') return;
    setItems([...items, { name: newItemName, quantity: newItemQuantity, enabled: true }]);
    setNewItemName('');
    setNewItemQuantity(0);
    setAddItemModal(false);
  };

  const updateItem = () => {
    if (selectedItemIndex === null) return;
    setItems(prevItems =>
      prevItems.map((item, index) =>
        index === selectedItemIndex
          ? { name: itemBeingEditedName, quantity: itemBeingEditedQuantity, enabled: itemBeingEditedEnabled }
          : item
      )
    );
    setItemBeingEditedName('');
    setItemBeingEditedQuantity(0);
    setItemBeingEditedEnabled(true);
    setSelectedItemIndex(null);
    setItemsManagerModal(false);
  };

  const closeAddItemModal = () => setAddItemModal(false);
  const closeItemsManagerModal = () => setItemsManagerModal(false);

  const handleItemChange = (e) => {
    const index = e.target.value;
    setSelectedItemIndex(index);
    setItemBeingEditedName(items[index].name);
    setItemBeingEditedQuantity(items[index].quantity);
    setItemBeingEditedEnabled(items[index].enabled);
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
            onClick={() => setAddItemModal(true)}
            className='bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300'
          >
            Add New Item
          </button>
          <button
            onClick={() => setItemsManagerModal(true)}
            className='bg-gradient-to-r from-purple-500 to-purple-700 text-white px-5 py-2 rounded shadow-md hover:from-purple-600 hover:to-purple-800 transition duration-300'
          >
            Items Manager
          </button>
          <button
            onClick={() => navigate('/inventory')}
            className='bg-gradient-to-r from-gray-500 to-gray-700 text-white px-5 py-2 rounded shadow-md hover:from-gray-600 hover:to-gray-800 transition duration-300'
          >
            Back
          </button>
          <button
            onClick={() => navigate('/orders')}
            className='bg-gradient-to-r from-teal-500 to-teal-700 text-white px-5 py-2 rounded shadow-md hover:from-teal-600 hover:to-teal-800 transition duration-300'
          >
            View All Orders
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mt-8'>
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
            <div className='text-lg'>
              Quantity: {item.quantity}
            </div>
            <div className={`mt-2 text-sm ${item.enabled ? 'text-green-500' : 'text-red-500'}`}>
              Status: {item.enabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding new item */}
      {addItemModal && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center'>
          <div className='bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg w-1/3'>
            <h3 className='text-xl font-semibold mb-4'>
              Add New Item
            </h3>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>
                Item Name
              </label>
              <input
                type='text'
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder='Enter item name'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>
                Quantity
              </label>
              <div className='flex items-center'>
                <input
                  type='range'
                  min='0'
                  max='100'
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                  className='w-full bg-gray-200 dark:bg-gray-700'
                />
                <input
                  type='text'
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                  className='w-16 ml-2 px-2 py-1 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                />
              </div>
            </div>
            <div className='flex justify-end'>
              <button
                onClick={addItem}
                className='bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded mr-2'
              >
                Add
              </button>
              <button
                onClick={closeAddItemModal}
                className='bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for items manager */}
      {itemsManagerModal && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center'>
          <div className='bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg w-1/3 relative'>
            <button
              onClick={closeItemsManagerModal}
              className='absolute top-2 right-2 text-gray-500 dark:text-gray-300 text-2xl'
            >
              &times;
            </button>
            <h3 className='text-xl font-semibold mb-4'>
              Edit Item
            </h3>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>
                Select Item
              </label>
              <select
                value={selectedItemIndex ?? ''}
                onChange={handleItemChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
              >
                <option value='' disabled>Select an item</option>
                {items.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name || `Item ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>
            {selectedItemIndex !== null && (
              <>
                <div className='mb-4'>
                  <label className='block text-sm font-medium mb-1'>
                    Item Name
                  </label>
                  <input
                    type='text'
                    value={itemBeingEditedName}
                    onChange={(e) => setItemBeingEditedName(e.target.value)}
                    placeholder='Enter item name'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium mb-1'>
                    Quantity
                  </label>
                  <div className='flex items-center'>
                    <input
                      type='range'
                      min='0'
                      max='100'
                      value={itemBeingEditedQuantity}
                      onChange={(e) => setItemBeingEditedQuantity(Number(e.target.value))}
                      className='w-full bg-gray-200 dark:bg-gray-700'
                    />
                    <input
                      type='text'
                      value={itemBeingEditedQuantity}
                      onChange={(e) => setItemBeingEditedQuantity(Number(e.target.value))}
                      className='w-16 ml-2 px-2 py-1 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                    />
                  </div>
                </div>
                <div className='mb-4'>
                  <button
                    onClick={() => setItemBeingEditedEnabled(!itemBeingEditedEnabled)}
                    className={`w-full py-2 rounded-lg text-white ${itemBeingEditedEnabled ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    {itemBeingEditedEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
                <div className='flex justify-end'>
                  <button
                    onClick={updateItem}
                    className='bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded mr-2'
                  >
                    Update
                  </button>
                  <button
                    onClick={closeItemsManagerModal}
                    className='bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded'
                  >
                    Cancel
                  </button>
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
