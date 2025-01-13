import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const userName = localStorage.getItem("userName");
  const url = "http://localhost:8080";

  //Fetch Cart Item
  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${url}/api/cart/getcart/${userName}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch cart items: ${response.status} ${response.statusText}`
        );
      }
      const cartData = await response.json();

      // Convert fetched cart data into the expected structure
      const formattedCartData = {};
      cartData.forEach((item) => {
        const compositeKey = `${item.itemId}|${item.size}`;
        formattedCartData[compositeKey] = item.quantity;
      });

      setCartItem(formattedCartData);
      console.log("Fetched and formatted cart data:", formattedCartData);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItem([]); // Clear cart items on error
    }
  };

  useEffect(() => {
    if (!userName) {
      console.warn("No userName found in localStorage");
      return;
    }
    fetchCartItems();
  }, [userName]);

  useEffect(() => {
    if (!cartItems.length || !foodList.length) return;

    const cartDetails = Object.entries(cartItems)
      .map(([key, count]) => {
        const [itemId, size] = key.split("|");
        const item = foodList.find((food) => food.id === itemId);

        if (!item) {
          console.warn(`Food item with ID ${itemId} not found in foodList.`);
          return null; // Handle missing items gracefully
        }

        return {
          name: item.name,
          size,
          quantity: count,
        };
      })
      .filter(Boolean); // Filter out null values

    console.log("Mapped Cart Items:", cartDetails);
  }, [cartItems, foodList]);

  // Fetch food list from the API
  const fetchFoodList = async () => {
    try {
      const response = await fetch(`${url}/api/food/getfoods`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setFoodList(data);
    } catch (error) {
      console.error("Error fetching food list:", error);
      setFoodList([]); // Handle failure by setting foodList to an empty array
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
    }
    loadData();
  }, []);

  
  // Calculate the total price of the items in the cart
  const getTotalPrice = () => {
    if (!cartItems || !foodList) return 0; // Ensure valid data
    return Object.entries(cartItems).reduce((total, [compositeKey, count]) => {
      const [itemId, size] = compositeKey.split("|");
      const item = foodList.find((food) => food.id === itemId);

      if (item && item.price[size]) {
        const sizePrice = item.price[size]; // Fetch the price for the specific size
        total += sizePrice * count; // Add the item's total price to the total
      } else {
        console.warn(
          `Item with ID: ${itemId} or size: ${size} not found in foodList or missing price.`
        );
      }

      return total;
    }, 0);
  };

  // Calculate the final total price including delivery fee
  const lastTotalPrice = () => {
    const deliveryFee = 200; // Fixed delivery fee
    const subtotal = getTotalPrice(); // Subtotal from cart items
    return subtotal > 0 ? subtotal + deliveryFee : 0; // Add delivery fee only if subtotal is greater than 0
  };

  // Get the total number of items in the cart
  const getTotalItems = () => {
    if (!cartItems) return 0; // Ensure cartItems is valid
    return Object.values(cartItems)
      .map(Number) // Convert each value to a number
      .reduce((total, count) => total + count, 0); // Sum all quantities
  };

  // Remove item from the cart
  const removeFromCart = async (itemId, size) => {
    const compositeKey = `${itemId}|${size}`;

    if (cartItems[compositeKey]) {
      const item = foodList.find((food) => food.id === itemId);
      const quantity = cartItems[compositeKey];
      const sizePrice = item.price[size] || 0;

      // Decrease the quantity for the item (or remove it completely if quantity is 1)
      const updatedQuantity = quantity - 1;

      // Prepare the updated cart data for the API request
      const updatedCartItem = {
        userName,
        itemId,
        itemName: item.name,
        quantity: updatedQuantity,
        size: size,
        price: sizePrice,
      };

      try {
        // Send a request to update the cart in the backend
        const response = await axios.put(
          `${url}/api/cart/updatecart/${userName}`,
          updatedCartItem
        );

        if (response.status === 200) {
          // If the request was successful, update the local cart state
          const updatedCart = { ...cartItems };

          if (updatedQuantity <= 0) {
            delete updatedCart[compositeKey]; // Remove the item if quantity is 0
          } else {
            updatedCart[compositeKey] = updatedQuantity; // Update the quantity
          }

          setCartItem(updatedCart); // Update the local state
          toast.success("Item removed from cart!");
        } else {
          toast.error("Failed to remove item from cart.");
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
        toast.error("Failed to remove item from cart.");
      }
    } else {
      toast.error("Item not found in cart.");
    }
  };


  // Log cart items when they change

  const contextValue = {
    foodList,
    cartItems,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    lastTotalPrice,
    fetchCartItems,
    setCartItem,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
