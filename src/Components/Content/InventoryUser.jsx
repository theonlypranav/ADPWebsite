import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/bg.jpg";
import { faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Inventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [remarkToShow, setRemarkToShow] = useState(null);
  const [showCompleteOrderModal, setShowCompleteOrderModal] = useState(false);
  const [notification, setNotification] = useState("");
  const [user, setUser] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemLink, setNewItemLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

    // Fetch the user info from localStorage
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;
    const token = localStorage.getItem("token");
        // If token is not found, redirect to /inventory


  useEffect(() => {
    if (!token || userData.access != 'user' ) {
      // If no token found, redirect to inventory page
      navigate('/inventory');
    }
    setUser(userData);
    fetch("https://adp-backend-bzdrfdhvbhbngbgu.southindia-01.azurewebsites.net/api/inventorys/inventory/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(
          data.map((item) => ({
            id: item._id,
            name: item.itemName,
            quantity: 0,
          }))
        );
      })
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);

  const handleQuantityChange = (index, value) => {
    const newQuantity = Math.max(0, Number(value));
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const incrementQuantity = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (index) => {
    setItems((prevItems) =>
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
      setCart((prevCart) => {
        // Check if the item is already in the cart
        const existingItemIndex = prevCart.findIndex(
          (cartItem) => cartItem.item_id === item.id
        );
        if (existingItemIndex !== -1) {
          // Update quantity if item is already in the cart
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            ordered_quantity:
              updatedCart[existingItemIndex].ordered_quantity + item.quantity,
          };
          return updatedCart;
        } else {
          // Add new item to the cart with item name
          return [
            ...prevCart,
            {
              item_id: item.id,
              item_name: item.name,
              ordered_quantity: item.quantity,
            },
          ];
        }
      });
      setItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index ? { ...item, quantity: 0 } : item
        )
      );
      setNotification("Added to Cart");
      setTimeout(() => setNotification(""), 2000);
    }
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleAddNewItem = async () => {
    // Basic validation before sending request
    if (!newItemName || !newItemQuantity) {
        setErrorMessage('Item name and quantity are required.');
        return;
    }

    setCart((prevCart) => {
      // Check if the item is already in the cart
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.itemName === newItemName
      );
      if (existingItemIndex !== -1) {
        // Update quantity if item is already in the cart
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          ordered_quantity:
            updatedCart[existingItemIndex].ordered_quantity + newItemQuantity,
        };
        return updatedCart;
      } else {
        // Add new item to the cart with item name
        return [
          ...prevCart,
          {
            item_id: null,
            item_name: newItemName,
            ordered_quantity: newItemQuantity,
            link: newItemLink
          },
        ];
      }
    });
    setNotification("Added to Cart");
    setTimeout(() => setNotification(""), 2000);

    // Clear the fields after a successful request
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemLink('');
    setErrorMessage('');

    // Close the dialog
    setIsDialogOpen(false);
  };

  const Cartclear = () => {
    setCart([]);
    setShowCart(false);
  };

  const placeOrder = async () => {
    // Fetch the user info from localStorage
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;
    const token = localStorage.getItem("token");
    setUser(userData);
  
    // Split cart items into two categories: those with item_id and those without
    const cartWithItemId = cart.filter(cartItem => cartItem.item_id !== null);
    const cartWithoutItemId = cart.filter(cartItem => cartItem.item_id === null);
  
    // Format the cart items with item_id to match the required order format
    const formattedCart = cartWithItemId.map(cartItem => ({
      item_id: cartItem.item_id,
      ordered_quantity: cartItem.ordered_quantity,
    }));
  
    try {
      // Proceed with placing order for items with item_id (original placeOrder logic)
      if (formattedCart.length > 0) {
        const response = await fetch("https://adp-backend-bzdrfdhvbhbngbgu.southindia-01.azurewebsites.net/api/cart/add-items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userData.id, // Using userData directly to avoid async issue with state
            items: formattedCart,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        setNotification("Order Placed");
        setTimeout(() => setNotification(""), 2000);
      }
  
      // Now handle items without item_id (logic from handleAddNewItem)
      for (const newItem of cartWithoutItemId) {
        const response = await fetch("https://adp-backend-bzdrfdhvbhbngbgu.southindia-01.azurewebsites.net/api/cart/add-custom-item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userData.id,
            itemName: newItem.item_name,
            ordered_quantity: newItem.ordered_quantity,
            link: newItem.link || "", // Assuming the link is optional
          }),
        });
  
        const data = await response.json();
        if (response.status !== 200) {
          // Handle any errors from the backend
          setErrorMessage(data.errors ? data.errors.map(err => err.msg).join(", ") : "Failed to add custom item");
          continue;
        }
      }
  
      // Clear cart and close order modal after successful requests
      clearCart();
      setShowCompleteOrderModal(false);
  
    } catch (error) {
      console.error("Error placing order:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };
  

  const fetchOrders = async () => {
    // Fetch the user info from localStorage
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;
    const token = localStorage.getItem("token");
    setUser(userData); // Ensure setUser updates state properly
  
    // Optional: Log user and cart information for debugging
    console.log(
      JSON.stringify({
        userId: userData?.id
      })
    );
  
    if (userData && userData.id) {
      try {
        const response = await fetch(
          `https://adp-backend-bzdrfdhvbhbngbgu.southindia-01.azurewebsites.net/api/cart/cart-items-final/${userData.id}`, // Corrected userData.id
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json(); // Only calling response.json() once
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  const toggleViewMode = () => {
    setIsGridView(!isGridView)
  };
    // State for the search query
    const [searchQuery, setSearchQuery] = useState("");
  
    // Handler for search input
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    // Filter items based on the search query (case-insensitive)
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleViewOrders = () => {
    if (!showOrders) {
      fetchOrders(); // Fetch orders only when the button is clicked to show the orders
    }
    setShowOrders(!showOrders); // Toggling showOrders state
  };
  
  <button
    onClick={handleViewOrders} // Single onClick handler
    className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded shadow-md hover:from-green-600 hover:to-green-800 transition duration-300"
  >
    {showOrders ? "Hide Orders" : "View Orders"}
  </button>;

  const handleLogoutAndRedirect = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/inventory');
  };

  return (
    <div
      id="Inventory"
      className="bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-32 px-5 py-20 min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="top-transition"></div>
      <div className="w-full flex flex-col items-start mb-12 max-w-6xl">
        <h1
          style={{ fontFamily: 'Anton', letterSpacing: 4, fontSize: '64px' }}
          className="text-4xl uppercase font-bold mb-2 text-silver-700 dark:text-silver-300"
        >
          Inventory Management
        </h1>
        <h2
          style={{ fontSize: '36px', paddingTop: '24px', fontFamily: 'Anton', letterSpacing: 2 }}
          className="text-xl font-semibold text-silver-600 dark:text-silver-400"
        >
          Welcome, {user?.clubName || "Guest"} !
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-justify">
          For any queries, contact{" "}
          <a href="https://wa.me/9937020000" className="text-blue-500 underline">Krish Vora</a>,{" "}
          <a href="https://wa.me/8769934945" className="text-blue-500 underline">Ayush Jain</a>
        </p>
        <div className="flex flex-wrap justify-between mt-12 w-full space-x-0 sm:space-x-4">
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-[#390B31] border-2 border-white h-16 text-2xl rounded-md text-white px-4 shadow-md transition duration-300 font-bold flex items-center justify-center"
          >
            {showCart ? "Hide Cart" : "View Cart"}
            <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
          </button>
          <button
            onClick={handleViewOrders}
            className="bg-[#390B31] border-2 border-white h-16 text-2xl rounded-md text-white px-4 shadow-md transition duration-300 font-bold flex items-center justify-center"
          >
            {showOrders ? "Hide Orders" : "Your Orders"}
            <FontAwesomeIcon icon={faStoreAlt} className="text-white ml-2" />
          </button>
          <button
            onClick={toggleViewMode}
            className="bg-[#390B31] border-2 border-white w-full sm:w-auto h-16 text-2xl rounded-md text-white px-4 shadow-md transition duration-300 font-bold flex items-center justify-center"
          >
            {isGridView ? 'List View' : 'Grid View'}
          </button>
          <button
            onClick={handleLogoutAndRedirect}
            className="bg-[#390B31] border-2 border-white h-16 text-2xl rounded-md text-white px-4 shadow-md transition duration-300 font-bold flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="justify-center" />
          </button>
        </div>
      </div>
  
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
          {notification}
        </div>
      )}
  
      {showCart && (
        <div className="w-full max-w-6xl mt-6 p-4 bg-black/50 backdrop-blur-md shadow-lg border glow rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Cart Items</h3>
          <table className="min-w-full dark:bg-black rounded-lg">
            <thead style={{ backgroundColor: '#2A0C25' }} className="bg-gray-300 dark:bg-gray-700">
              <tr>
                <th className="py-4 px-4 border-b text-xl uppercase text-left text-gray-700 dark:text-gray-300">Item</th>
                <th className="py-2 px-4 border-b text-xl uppercase text-center text-gray-700 dark:text-gray-300">Quantity</th>
                <th className="py-2 px-4 border-b text-xl uppercase text-center text-gray-700 dark:text-gray-300">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-4 px-4 text-center text-gray-600 dark:text-gray-300">No items in cart</td>
                </tr>
              ) : (
                cart.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                    <td className="py-4 px-4 text-xl border-b text-gray-600 dark:text-gray-100 ">{item.item_name}</td>
                    <td className="py-2 px-4 border-b text-xl text-gray-600 dark:text-gray-100 text-center">{item.ordered_quantity}</td>
                    <td className="py-2 px-4 border-b text-xl text-gray-600 dark:text-gray-100 text-center">
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-700 text-xl transition duration-200 transform hover:scale-110"
                      >
                        &#x2715; {/* Unicode for cross symbol */}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
  
          {cart.length > 0 && (
            <div className="mt-4">
              <button
                onClick={placeOrder}
                className="bg-[#390B31] text-white px-6 py-2 rounded shadow-md transition duration-300 hover:from-purple-600 hover:to-purple-800 transform hover:scale-105 hover:shadow-lg"
              >
                Confirm Order
              </button>
              <button
                onClick={Cartclear}
                className="bg-[#390B31] text-white ml-12 px-6 py-2 rounded shadow-md transition duration-300 hover:from-purple-600 hover:to-purple-800 transform hover:scale-105 hover:shadow-lg"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
      )}
  
      {showOrders && (
        <div className="w-full max-w-6xl mt-6 p-4 bg-black/30 backdrop-blur-md shadow-lg border glow rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Your Orders</h3>
          <table className="min-w-full bg-white dark:bg-black rounded-lg">
            <thead style={{ backgroundColor: '#2A0C25' }} className="bg-gray-300 dark:bg-gray-700">
              <tr>
                <th className="py-4 px-4 border-b text-left text-xl uppercase text-gray-700 dark:text-gray-300">Item</th>
                <th className="py-4 px-4 border-b text-center text-xl uppercase text-gray-700 dark:text-gray-300">Ordered Quantity</th>
                <th className="py-4 px-4 border-b text-center text-xl uppercase text-gray-700 dark:text-gray-300">Status</th>
                <th className="py-4 px-4 border-b text-center text-xl uppercase text-gray-700 dark:text-gray-300">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 px-4 text-center text-gray-600 dark:text-gray-300">No orders found</td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 border-b text-xl text-gray-800 dark:text-gray-100">{order.itemName}</td>
                    <td className="py-4 px-4 border-b text-center text-xl text-gray-800 dark:text-gray-100">{order.ordered_quantity}</td>
                    <td className="py-4 px-4 border-b text-center text-xl text-gray-800 dark:text-gray-100">{order.status}</td>
                    <td className="py-4 px-4 border-b text-center text-xl text-gray-800 dark:text-gray-100">
                      {order.remarks ? (
                        <button
                          style={{backgroundColor: '#390B31'}}
                          className=" text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                          onClick={() => setRemarkToShow(order.remarks)}
                        >
                          View
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        
  

    {/* Modal to display the remark */}
    {remarkToShow && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-600">
          <h4 className="text-2xl font-bold mb-4 text-center">Remark</h4> {/* Increased heading size */}
          <p className="text-center mb-4">{remarkToShow}</p> {/* Added bottom margin for spacing */}
          <div className="flex justify-center">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition duration-300"
              onClick={() => setRemarkToShow(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}

{isDialogOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-black/50 backdrop-blur-lg border glow p-6 rounded-lg shadow-lg z-60 max-w-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Item Name"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        className="mb-3 p-2 border rounded w-full text-black font-bold"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newItemQuantity}
        onChange={(e) => setNewItemQuantity(e.target.value)}
        className="mb-3 p-2 border rounded w-full text-black font-bold"
      />
      <input
        type="text"
        placeholder="Link for ordering (optional)"
        value={newItemLink}
        onChange={(e) => setNewItemLink(e.target.value)}
        className="mb-3 p-2 border rounded w-full text-black font-bold"
      />
      <div className="flex justify-between">
        <button
          onClick={handleAddNewItem}
          style={{backgroundColor: '#390B31'}}
          className="hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
        <button
          onClick={() => setIsDialogOpen(false)}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      {showCompleteOrderModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
            <table className="min-w-full bg-gray-200 dark:bg-gray-800 rounded-lg">
              <thead className="bg-gray-300 dark:bg-gray-700">
                <tr>
                  <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">
                    Item
                  </th>
                  <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td
                      colSpan="2"
                      className="py-4 px-4 text-center text-gray-600 dark:text-gray-300"
                    >
                      No items in cart
                    </td>
                  </tr>
                ) : (
                  cart.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">
                        {item.item_name}
                      </td>
                      <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">
                        {item.ordered_quantity}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowCompleteOrderModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={placeOrder}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

<div className="w-full max-w-6xl mt-6">
      <h3 className="text-2xl font-bold mb-4 uppercase">Available Items</h3>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search items by title"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 mb-6 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No items available
        </p>
      ) : (
        <ul className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
          {filteredItems.map((item, index) => (
            <li
              key={item.id}
              className={`bg-black/50 backdrop-blur-lg flex items-center justify-center shadow-lg hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.6)] transition-all duration-300 transform hover:scale-105 p-4 sm:p-6 rounded-lg flex ${isGridView ? 'flex-col justify-between' : 'flex-row items-center justify-between space-x-4'} border border-gray-200`}
              style={isGridView ? { minHeight: '200px', maxHeight: '400px', minWidth: '200px', maxWidth: '400px' } : { minHeight: '100px' }}
            >
              <div className={`flex-grow ${isGridView ? 'flex items-start justify-center' : 'flex justify-start max-w-xs'}`} style={isGridView ? { minHeight: '60%', paddingTop: '10px', paddingBottom: '10px' } : {}}>
                <h4 className={`text-xl sm:text-2xl md:text-2xl font-semibold ${isGridView ? 'text-center' : 'text-left'} leading-tight`}>
                  {item.name}
                </h4>
              </div>
              <div className={`flex items-center justify-center pd-2 bg-white rounded-xl w-l space-x-2 sm:space-x-4 ${isGridView ? 'mb-2' : 'flex-shrink-0 absolute left-1/2 transform -translate-x-1/2'}`} style={isGridView ? { minHeight: '20%' } : {}}>
                <button
                  onClick={() => decrementQuantity(index)}
                  className="text-black font-bold text-5xl sm:text-3xl px-2 py-1 rounded transition duration-200 transform hover:scale-105"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  className="w-10 sm:w-12 font-semibold text-black text-5xl sm:text-2xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => incrementQuantity(index)}
                  className="text-black font-bold text-3xl sm:text-3xl px-2 py-1 rounded transition duration-200 transform hover:scale-105"
                >
                  +
                </button>
              </div>
              <div className={`flex-grow ${isGridView ? 'flex items-center justify-center' : 'flex justify-end'}`} style={isGridView ? { minHeight: '20%' } : {}}>
                <button
                  onClick={() => addToCart(index)}
                  style={{ backgroundColor: '#390B31'}}
                  className=" text-white font-semibold text-xs sm:text-sm px-3 py-1 mt-2 rounded transition duration-200 transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
          <li
            key="add-item"
            className={`bg-black/50 backdrop-blur-lg shadow-lg hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.6)] transition-all duration-300 transform hover:scale-105 p-4 sm:p-6 rounded-xl border borger-gray flex ${isGridView ? 'flex-col justify-center' : 'flex-column items-center justify-center space-x-4'}`}
            style={isGridView ? { minHeight: '200px', maxHeight: '400px', minWidth: '200px', maxWidth: '400px' } : { minHeight: '100px' }}
          >
            <button
              onClick={toggleDialog}
              className="text-white font-bold text-6xl px-6"
            >
              +
            </button>
          </li>
        </ul>
      )}
    </div>
    </div>
  );
}

export default Inventory;