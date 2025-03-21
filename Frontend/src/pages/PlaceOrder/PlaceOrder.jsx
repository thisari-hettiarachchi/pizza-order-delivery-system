import React, { useContext, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import "./PlaceOrder.css";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    getTotalPrice,
    lastTotalPrice,
    discount,
    deliveryFee,
    cartItems,
    foodList,
    url,
    userName,
    deleteCart,
  } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if cart is empty
    if (Object.keys(cartItems).length === 0) {
      toast.warn("Your cart is empty. Please add items to proceed.");
      return;
    }

    // Create an array of items with details
    const orderItems = Object.entries(cartItems).map(
      ([compositeKey, itemData]) => {
        const [itemId, size] = compositeKey.split("|");
        const item = foodList.find((food) => food.id === itemId);
        const sizePrice = item ? item.price[size] : 0;
        return {
          itemId,
          itemName: item ? item.name : "Unknown Item",
          size,
          price: sizePrice,
          quantity: itemData.quantity,
          totalPrice: sizePrice * itemData.quantity,
        };
      }
    );

    const orderData = {
      userName: userName,
      items: orderItems,
      totalPrice: getTotalPrice() === 0 ? "0" : getTotalPrice().toString(),
      discount: discount.toString(),
      deliveryFee: deliveryFee,
      lastTotalPrice: lastTotalPrice().toString(),
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      contactNumber: formData.contactNumber,
      paymentStatus: "PENDING",
    };

    try {
      // Send the order data to the backend API
      const response = await axios.post(url + "/api/order/create", orderData);

      // Redirect to Stripe checkout page
      if (response.data) {
        window.location.href = response.data;
      }

      // Show success message
      toast.success("Order placed successfully!");
      deleteCart();

      // Clear form data and cart items
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        contactNumber: "",
      });
    } catch (error) {
      // Handle error (e.g., show error message)
      toast.error("Error placing order: " + error);
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip code"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{getTotalPrice()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs.{getTotalPrice() === 0 ? 0 : 200}</p>
            </div>
            <hr />
            {discount ? (
              <>
                <div className="cart-total-details">
                  {" "}
                  <p>Discount</p>
                  <p>{discount}%</p>
                </div>
                <hr />
              </>
            ) : (
              ""
            )}
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs.{getTotalPrice() === 0 ? 0 : lastTotalPrice()} </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
