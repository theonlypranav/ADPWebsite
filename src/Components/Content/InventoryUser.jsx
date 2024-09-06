import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/bg.jpg";

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

  const clearCart = () => {
    setCart([]);
    setShowCart(false);
  };

  const placeOrder = () => {
    // Fetch the user info from localStorage
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;
    const token = localStorage.getItem("token");
    setUser(userData);

    // Format the cart items to match the required order format
    const formattedCart = cart.map((cartItem) => ({
      item_id: cartItem.item_id,
      ordered_quantity: cartItem.ordered_quantity,
    }));

    fetch("https://adp-backend-bzdrfdhvbhbngbgu.southindia-01.azurewebsites.net/api/cart/add-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userData.id, // Using userData directly to avoid async issue with state
        items: formattedCart,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert("Order Placed");
        clearCart();
        setShowCompleteOrderModal(false);
      })
      .catch((error) => console.error("Error placing order:", error));
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
      <div className="text-center w-full flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-silver-700 dark:text-silver-300">
          Inventory Management
        </h1>
        <h2 className="text-xl font-semibold text-silver-600 dark:text-silver-400">
          Welcome, {user?.clubName || "Guest"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-justify">
          For any queries, contact{" "}
          <a
            href="https://wa.me/9937020000"
            className="text-blue-500 underline"
          >
            Krish Vora
          </a>
          ,{" "}
          <a
            href="https://wa.me/8769934945"
            className="text-blue-500 underline"
          >
            Ayush Jain
          </a>
        </p>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded shadow-md hover:from-green-600 hover:to-green-800 transition duration-300"
          >
            {showCart ? "Hide Cart" : "View Cart"}
          </button>
          <button
            onClick={clearCart}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded shadow-md hover:from-red-600 hover:to-red-800 transition duration-300"
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate("/inventory")}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300"
          >
            Back
          </button>
          <button
            onClick={() => setShowCompleteOrderModal(true)}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-2 rounded shadow-md hover:from-purple-600 hover:to-purple-800 transition duration-300"
          >
            Complete Order
          </button>
          <button
            onClick={handleViewOrders} // Single onClick handler
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded shadow-md hover:from-green-600 hover:to-green-800 transition duration-300"
          >
            {showOrders ? "Hide Orders" : "View Orders"}
          </button>
        </div>
      </div>

      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
          {notification}
        </div>
      )}

      {showCart && (
        <div className="w-full max-w-6xl mt-6 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-x-auto">
          <h3 className="text-2xl font-bold mb-4">Cart Items</h3>
          <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg">
            <thead className="bg-gray-300 dark:bg-gray-700">
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">
                  Item
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">
                  Quantity
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
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
                    <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &#x2715; {/* Unicode for a cross symbol */}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showOrders && (
        <div className="w-full max-w-6xl mt-6 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-x-auto">
          <h3 className="text-2xl font-bold mb-4">Your Orders</h3>
          <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg">
            <thead className="bg-gray-300 dark:bg-gray-700">
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">
                  Item
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">
                  Ordered Quantity
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-4 px-4 text-center text-gray-600 dark:text-gray-300"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">
                      {order.itemName}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">
                      {order.ordered_quantity}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">
                      {order.status}
                    </td>
                    <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">
                      {order.remarks ? (
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          onClick={() => setRemarkToShow(order.remarks)}
                        >
                          View Remark
                        </button>
                      ) : (
                        ""
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
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-bold mb-2">Remark</h4>
                <p>{remarkToShow}</p>
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => setRemarkToShow(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
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
        <h3 className="text-2xl font-bold mb-4">Available Items</h3>
        {items.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No items available
          </p>
        ) : (
          <ul className="list-none">
            {items.map((item, index) => (
              <li
                key={item.id}
                className="bg-gray-100 dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold flex-grow">
                    {item.name}
                  </h4>
                  <div className="flex items-center space-x-2 mr-40">
                    <button
                      onClick={() => decrementQuantity(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                      className="w-16 text-black text-center border rounded"
                    />
                    <button
                      onClick={() => incrementQuantity(index)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(index)}
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Inventory;
