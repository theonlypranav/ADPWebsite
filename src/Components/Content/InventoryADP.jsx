import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Inventory.css";
import bgImage from "../../assets/bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL } from './constants';

function Inventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [addItemModal, setAddItemModal] = useState(false);
  const [itemsManagerModal, setItemsManagerModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [itemBeingEditedName, setItemBeingEditedName] = useState("");
  const [itemBeingEditedQuantity, setItemBeingEditedQuantity] = useState(0);
  const [itemBeingEditedEnabled, setItemBeingEditedEnabled] = useState(true);
  const [tapCount, setTapCount] = useState(0);
  const [tapTimeout, setTapTimeout] = useState(null);
  const [loading, setLoading] = useState(true); // Add this line

  // Fetch token and user details from localStorage
  const userString = localStorage.getItem("user");
  const userData = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem("token");
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);

  useEffect(() => {
    if (!token || userData.access !== "bosslevel") {
      navigate("/inventory");
    } else {
      fetchItems();
    }
  }, [token, navigate]);

  // Fetch items from the API
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/inventorys/inventory`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
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
        setItems(sortedData);
      } else {
        alert("Failed to fetch items");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }

    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/cart/confirm-disabled`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setIsConfirmDisabled(data.isConfirmDisabled);
        console.log(data);
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };

    fetchOrderStatus();
  };

  const addItem = async () => {
    if (newItemName.trim() === "") return;

    const newItem = {
      itemQuantity: newItemQuantity,
      itemStatus: "enabled",
      itemName: newItemName,
    };

    try {
      const response = await fetch(
        `${BACKEND_URL}/inventorys/inventory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newItem),
        }
      );

      if (response.ok) {
        fetchItems(); // Refetch items after adding
        setNewItemName("");
        setNewItemQuantity(0);
        setAddItemModal(false);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("An error occurred while adding the item.");
    }
  };

  const deleteItem = async () => {
    if (selectedItemIndex === null) return;

    const itemId = items[selectedItemIndex]._id;
    try {
      const response = await fetch(
        `${BACKEND_URL}/inventorys/inventory/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchItems(); // Refetch items after deleting
        setItemsManagerModal(false);
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  // Toggle the button state
  const handleToggle = async () => {
    try {
      // Toggle the confirmation status locally first
      const newStatus = !isConfirmDisabled;
      const response = await fetch(
        `${BACKEND_URL}/cart/confirm-disabled`,
        {
          method: "PUT", // Assuming you want to update the status
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isConfirmDisabled: newStatus }), // Send the new status in the request body
        }
      );

      // Check if the response is okay before parsing
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const data = await response.json();
      setIsConfirmDisabled(data.isConfirmDisabled); // Update the state based on the response
      console.log(data);
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  };

  const updateItem = async () => {
    if (selectedItemIndex === null) return;

    const itemId = items[selectedItemIndex]._id;
    const updatedItem = {
      itemName: itemBeingEditedName,
      itemStatus: itemBeingEditedEnabled ? "enabled" : "disabled",
      itemQuantity: itemBeingEditedQuantity,
    };

    try {
      const response = await fetch(
        `${BACKEND_URL}/inventorys/inventory/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        fetchItems(); // Refetch items after updating
        setItemsManagerModal(false);
      } else {
        alert("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const closeAddItemModal = () => setAddItemModal(false);
  const closeItemsManagerModal = () => {
    setItemsManagerModal(false);
    setSelectedItemIndex(null);
    setItemBeingEditedName("");
    setItemBeingEditedQuantity(0);
    setItemBeingEditedEnabled(true);
  };

  const handleItemChange = (e) => {
    const index = Number(e.target.value);
    setSelectedItemIndex(index);
    const selectedItem = items[index];
    setItemBeingEditedName(selectedItem.itemName);
    setItemBeingEditedQuantity(selectedItem.itemQuantity);
    setItemBeingEditedEnabled(selectedItem.itemStatus === "enabled");
  };

  const handleLogoutAndRedirect = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/inventory");
  };

  const [searchQuery, setSearchQuery] = useState("");

  // Handler for search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter items based on the search query (case-insensitive)
  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [isOrderConfirmedEnabled, setIsOrderConfirmedEnabled] = useState(true); // State for the toggle

  // Handler to toggle order confirmation state
  const handleToggleOrderConfirmation = () => {
    setIsOrderConfirmedEnabled(!isOrderConfirmedEnabled);
    setIsConfirmDisabled(!isConfirmDisabled); // Update context state as well
  };

  return (
    <div
      id="Inventory"
      className="bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-32 md:px-16 sm:px-8 px-5 py-20 min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="top-transition"></div>
      <div className="text-center w-full flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-silver-700 dark:text-silver-300 sm:text-3xl text-2xl">
          Inventory Management
        </h1>
        <h2 className="text-xl font-semibold text-silver-600 dark:text-silver-400 sm:text-lg text-base">
          Welcome, {userData?.cordName || "CRAC Coordinator"}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {/* Button rendering */}
          <button
            onClick={handleToggle}
            className={`w-full sm:w-auto px-4 py-2 rounded shadow-md text-white ${
              isConfirmDisabled
                ? "bg-gray-700 border-2 border-white text-white"
                : "bg-[#390B31] border-2 border-white text-white"
            }`}
          >
            {isConfirmDisabled ? "Orders Disabled" : "Orders Enabled"}
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="w-full sm:w-auto bg-[#390B31] border-2 border-white text-white px-5 py-2 rounded shadow-md hover:from-teal-600 hover:to-teal-800 transition duration-300"
          >
            View All Orders
          </button>
          <button
            onClick={() => navigate("/items")}
            className="w-full sm:w-auto bg-[#390B31] border-2 border-white text-white px-5 py-2 rounded shadow-md hover:from-teal-600 hover:to-teal-800 transition duration-300"
          >
            Inventory Items Analysis
          </button>
          <button
            onClick={() => navigate("/customitems")}
            className="w-full sm:w-auto bg-[#390B31] border-2 border-white text-white px-5 py-2 rounded shadow-md hover:from-teal-600 hover:to-teal-800 transition duration-300"
          >
            Inventory Custom Analysis
          </button>
          <button
            onClick={handleLogoutAndRedirect}
            className="w-full sm:w-auto bg-[#390B31] border-2 border-white text-white px-5 py-2 rounded shadow-md hover:from-red-600 hover:to-red-800 transition duration-300"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-white ml-2" />
          </button>
        </div>
      </div>

      <div className="relative w-full mb-6 max-w-lg">
        <div className="absolute left-3 top-3 text-gray-500 pl-5">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          placeholder="Search items by title"
          value={searchQuery}
          onChange={handleSearchChange}
          className="
          w-full 
          p-3 mb-6 border border-gray-300 rounded-full
          text-center text-white placeholder-gray-500 
          transition-all duration-300 ease-in-out 
          focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent
          bg-black/50 
        "
          style={{
            boxShadow:
              "inset 0px -6px 12px rgba(0, 0, 0, 0.2), inset 0px 6px 12px rgba(0, 0, 0, 0.1)",
          }}
          onFocus={(e) =>
            (e.target.style.boxShadow =
              "0 0 15px rgba(255, 255, 255, 0.5), inset 0px -6px 12px rgba(0, 0, 0, 0.2), inset 0px 6px 12px rgba(0, 0, 0, 0.1)")
          }
          onBlur={(e) =>
            (e.target.style.boxShadow =
              "inset 0px -6px 12px rgba(0, 0, 0, 0.2), inset 0px 6px 12px rgba(0, 0, 0, 0.1)")
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-8">
        {loading ? (
          <div className="loading-spinner text-center text-lg">Loading...</div> // Loading indicator
        ) : (
          <>
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className="bg-black/50 backdrop-blur-lg dark:bg-black/50 border border-gray-600 dark:border-gray-700 p-8 rounded-lg shadow-md flex flex-col items-center text-center"
                onContextMenu={(e) => {
                  e.preventDefault(); // Prevent default context menu
                  setSelectedItemIndex(index);
                  setItemBeingEditedName(item.itemName);
                  setItemBeingEditedQuantity(item.itemQuantity);
                  setItemBeingEditedEnabled(item.itemStatus === "enabled");
                  setItemsManagerModal(true);
                }}
                onTouchStart={() => {
                  if (tapCount === 0) {
                    setTapCount(1);
                    setTapTimeout(
                      setTimeout(() => {
                        setTapCount(0); // Reset tap count after delay
                      }, 300)
                    ); // Delay for detecting double tap
                  } else {
                    clearTimeout(tapTimeout); // Clear the timeout
                    setTapCount(0); // Reset tap count

                    // Open the modal on double tap
                    setSelectedItemIndex(index);
                    setItemBeingEditedName(item.itemName);
                    setItemBeingEditedQuantity(item.itemQuantity);
                    setItemBeingEditedEnabled(item.itemStatus === "enabled");
                    setItemsManagerModal(true);
                  }
                }}
              >
                <div className="text-lg font-semibold mb-2">
                  {item.itemName || `Item Name ${index + 1}`}
                </div>
                <div className="text-lg">Quantity: {item.itemQuantity}</div>
                <div
                  className={`mt-2 text-sm ${
                    item.itemStatus === "enabled"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Status: {item.itemStatus}
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center bg-black/50 backdrop-blur-lg dark:bg-black/50 border border-gray-600 dark:border-gray-700 p-8 rounded-lg shadow-md">
              <button
                onClick={() => setAddItemModal(true)}
                className="text-4xl text-green-500 hover:text-blue-700 transition duration-300"
              >
                <i className="bx bx-plus text-6xl"></i>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Add Item Modal */}
      {addItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Add New Item
            </h3>
            <input
              type="text"
              className="border p-2 mb-4 w-full bg-gray-700 text-white border-gray-600"
              placeholder="Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <input
              type="number"
              className="border p-2 mb-4 w-full bg-gray-700 text-white border-gray-600"
              placeholder="Item Quantity"
              value={newItemQuantity > 0 ? newItemQuantity : ""} // Set to empty if 0
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setNewItemQuantity(0); // Reset if input is empty
                } else {
                  setNewItemQuantity(Number(value));
                }
              }}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={addItem}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Item
              </button>
              <button
                onClick={closeAddItemModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
