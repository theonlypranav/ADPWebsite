import React, { useState } from 'react';

function Inventory() {
  const [items, setItems] = useState(Array(4).fill({ name: '', quantity: 0 }));
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [modal, setModal] = useState({ visible: false, item: '', quantity: 0 });
  const [addItemModal, setAddItemModal] = useState(false);
  const [itemsManagerModal, setItemsManagerModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const addItem = () => {
    if (newItemName.trim() === '') return;
    setItems([...items, { name: newItemName, quantity: newItemQuantity }]);
    setNewItemName('');
    setNewItemQuantity(0);
    setAddItemModal(false);
  };

  const updateItem = () => {
    if (selectedItemIndex === null) return;
    const updatedItems = [...items];
    updatedItems[selectedItemIndex] = { name: newItemName, quantity: newItemQuantity };
    setItems(updatedItems);
    setNewItemName('');
    setNewItemQuantity(0);
    setItemsManagerModal(false);
  };

  const increaseQuantity = (index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1;
    setItems(updatedItems);
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 0) updatedItems[index].quantity -= 1;
    setItems(updatedItems);
  };

  const addToCart = (index) => {
    const item = items[index].name;
    const quantity = items[index].quantity;
    if (quantity > 0) {
      setCart([...cart, { item, quantity }]);
      setItems(items.map((item, i) => (i === index ? { ...item, quantity: 0 } : item)));
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

  const closeAddItemModal = () => {
    setAddItemModal(false);
  };

  const closeItemsManagerModal = () => {
    setItemsManagerModal(false);
  };

  const openItemsManagerModal = (index) => {
    setSelectedItemIndex(index);
    setNewItemName(items[index].name);
    setNewItemQuantity(items[index].quantity);
    setItemsManagerModal(true);
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
                onClick={() => decreaseQuantity(index)}
                className='bg-gray-600 dark:bg-gray-800 text-white px-4 py-2 rounded-l'
              >
                -
              </button>
              <div className='w-20 text-center text-white'>
                {item.quantity}
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

      {/* Modal for adding new item */}
      {addItemModal && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center'>
          <div className='bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg w-1/3'>
            <h3 className='text-xl font-semibold mb-4'>
              Add New Item
            </h3>
            <input
              type='text'
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder='Item Name'
              className='border border-gray-300 dark:border-gray-600 px-4 py-2 rounded mb-4 w-full bg-white text-black dark:bg-gray-800 dark:text-white'
            />
            <input
              type='number'
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(Number(e.target.value))}
              placeholder='Quantity'
              min='0'
              className='border border-gray-300 dark:border-gray-600 px-4 py-2 rounded mb-4 w-full bg-white text-black dark:bg-gray-800 dark:text-white'
            />
            <div className='flex justify-end space-x-2'>
              <button
                onClick={addItem}
                className='bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300'
              >
                Add Item
              </button>
              <button
                onClick={closeAddItemModal}
                className='bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded shadow-md hover:from-gray-600 hover:to-gray-800 transition duration-300'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Items Manager */}
      {itemsManagerModal && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center'>
          <div className='bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg w-1/3'>
            <h3 className='text-xl font-semibold mb-4'>
              Items Manager
            </h3>
            <select
              onChange={(e) => setSelectedItemIndex(Number(e.target.value))}
              value={selectedItemIndex === null ? '' : selectedItemIndex}
              className='border border-gray-300 dark:border-gray-600 px-4 py-2 rounded mb-4 w-full bg-white text-black dark:bg-gray-800 dark:text-white'
            >
              <option value='' disabled>Select an item</option>
              {items.map((item, index) => (
                <option key={index} value={index}>
                  {item.name || `Item Name ${index + 1}`}
                </option>
              ))}
            </select>
            {selectedItemIndex !== null && (
              <div>
                <input
                  type='text'
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder='Item Name'
                  className='border border-gray-300 dark:border-gray-600 px-4 py-2 rounded mb-4 w-full bg-white text-black dark:bg-gray-800 dark:text-white'
                />
                <input
                  type='number'
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                  placeholder='Quantity'
                  min='0'
                  className='border border-gray-300 dark:border-gray-600 px-4 py-2 rounded mb-4 w-full bg-white text-black dark:bg-gray-800 dark:text-white'
                />
                <div className='flex justify-end space-x-2'>
                  <button
                    onClick={updateItem}
                    className='bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded shadow-md hover:from-green-600 hover:to-green-800 transition duration-300'
                  >
                    Update Item
                  </button>
                  <button
                    onClick={closeItemsManagerModal}
                    className='bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded shadow-md hover:from-gray-600 hover:to-gray-800 transition duration-300'
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Cart Confirmation */}
      {modal.visible && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center'>
          <div className='bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg w-1/3'>
            <h3 className='text-xl font-semibold mb-4'>
              Cart Confirmation
            </h3>
            <p className='mb-4'>
              Item: {modal.item}
            </p>
            <p className='mb-4'>
              Quantity: {modal.quantity}
            </p>
            <button
              onClick={closeModal}
              className='bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded shadow-md hover:from-gray-600 hover:to-gray-800 transition duration-300'
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
