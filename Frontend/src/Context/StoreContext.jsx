import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});

 const getTotalPrice = () => {
   return Object.entries(cartItems).reduce((total, [itemId, count]) => {
     const item = food_list.find((food) => food._id === itemId); // Use _id here
     return total + (item?.price || 0) * count;
   }, 0);
 };


  const getTotalItems = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  const addToCart = (itemId, quantity = 1) => {
    if (!cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: quantity })); // Initialize with the specified quantity
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + quantity })); // Increment by the specified quantity
    }
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
