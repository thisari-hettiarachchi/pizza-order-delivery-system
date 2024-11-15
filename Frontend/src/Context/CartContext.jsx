
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItem = (price) => {
    setItemCount((prevCount) => prevCount + 1);
    setTotalPrice((prevPrice) => prevPrice + price);
  };

  const removeItem = (price) => {
    setItemCount((prevCount) => Math.max(prevCount - 1, 0));
    setTotalPrice((prevPrice) => Math.max(prevPrice - price, 0));
  };

  return (
    <CartContext.Provider
      value={{ itemCount, totalPrice, addItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
