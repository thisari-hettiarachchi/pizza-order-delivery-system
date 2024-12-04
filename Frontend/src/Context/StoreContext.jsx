import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});

const getTotalPrice = () => {
  return Object.entries(cartItems).reduce((total, [compositeKey, count]) => {
    const [itemId, size] = compositeKey.split("|");
    const item = food_list.find((food) => food._id === itemId);

    if (item) {
      const sizePrice = item.price[size] || 0; // Directly access the size-specific price
      total += sizePrice * count;
    }

    return total;
  }, 0);
};


  const getTotalItems = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };


 const addToCart = (itemId, size, quantity = 1) => {
   const compositeKey = `${itemId}|${size}`; // Unique identifier for each size

   if (!cartItems[compositeKey]) {
     setCartItem((prev) => ({ ...prev, [compositeKey]: quantity }));
   } else {
     setCartItem((prev) => ({
       ...prev,
       [compositeKey]: prev[compositeKey] + quantity,
     }));
   }
 };
  const removeFromCart = (itemId, size) => {
    const compositeKey = `${itemId}|${size}`; // Unique identifier for each size

    if (cartItems[compositeKey]) {
      const updatedCart = { ...cartItems };
      const updatedQuantity = updatedCart[compositeKey] - 1;

      if (updatedQuantity <= 0) {
        delete updatedCart[compositeKey]; // Remove the item completely if quantity is 0
      } else {
        updatedCart[compositeKey] = updatedQuantity; // Update the quantity
      }

      setCartItem(updatedCart); // Update state with the new cart
    }
  };
useEffect(() => {
  console.log(
    "Cart Items:",
    Object.entries(cartItems).map(([key, count]) => {
      const [itemId, size] = key.split("|");
      const item = food_list.find((food) => food._id === itemId); // Use _id here
      return {
        name: item?.name || "Unknown Item",
        size,
        quantity: count, // Include the selected quantity
      };
    })
  );
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
