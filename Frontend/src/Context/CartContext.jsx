// CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItem = (quantity, price) => {
    setItemCount((prevCount) => prevCount + quantity);
    setTotalPrice((prevPrice) => prevPrice + quantity * price);
  };

  const removeItem = (quantity, price) => {
    setItemCount((prevCount) => Math.max(prevCount - quantity, 0));
    setTotalPrice((prevPrice) => Math.max(prevPrice - quantity * price, 0));
  };

  return (
    <CartContext.Provider
      value={{ itemCount, totalPrice, addItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
