import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./UserOrder.css";
import { toast } from "react-toastify";
import parcelIcon from "../../assets/parcel_icon.png"; // Fixed typo in "parcleIcon"

const UserOrder = () => {
  const { url, token, userName } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!userName || !token) {
      console.error("Error: Missing userName or token.");
      toast.error("User not logged in!");
      return;
    }

    try {
      console.log("Fetching orders with:", { url, userName, token });

      const response = await fetch(`${url}/api/order/getorder/${userName}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include if required
          "Content-Type": "application/json",
        },
      });

      console.log("API Response Status:", response.status); // Debugging API response status

      if (!response.ok) {
        throw new Error(
          `API Request failed: ${response.status} ${response.statusText}`
        );
      }

      const orderData = await response.json();
      console.log("Fetched order data:", orderData); // Debug response data

      if (Array.isArray(orderData)) {
        setOrders(orderData);
      } else {
        console.warn("Unexpected API response format:", orderData);
        setOrders([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      toast.error("Failed to fetch orders. Please try again.");
      setOrders([]); // Clear orders if an error occurs
    }
  };


  useEffect(() => {
    if (token && userName) {
      fetchOrders();
    }
  }, [token, userName]); // Ensures orders are fetched when userName or token changes

  return (
    <div className="user-order">
      <h2>My Orders</h2>
      <div className="container">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="user-order-order">
              <img src={parcelIcon} alt="Parcel Icon" />
              <p>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx !== order.items.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <span>No items found</span>
                )}
              </p>
              <p>Rs. {order.amount || 0}.00</p>
              <p>Items: {order.items?.length || 0}</p>
              <p>
                <span> &#x25cf;</span>
                <b>{order.status || "Unknown"}</b>
              </p>
              <button>Track Order</button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
