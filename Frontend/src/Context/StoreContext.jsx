import { createContext, useEffect, useState } from "react";

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

  // useEffect(() => {
  //   if (foodList.length === 0) return; // Ensure foodList is populated

  //   console.log(
  //     "Cart Items:",
  //     Object.entries(cartItems).map(([key, count]) => {
  //       const [itemId, size] = key.split("|");
  //       const item = foodList.find((food) => food.id === itemId);

  //       if (!item) {
  //         console.warn(`Food item with ID ${itemId} not found in foodList.`);
  //       }

  //       return {
  //         name: item?.name,
  //         size,
  //         quantity: count,
  //       };
  //     })
  //   );
  // }, [cartItems, foodList]);

  // Calculate the total price of the items in the cart
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
  const removeFromCart = (itemId, size) => {
    const compositeKey = `${itemId}|${size}`;

    if (cartItems[compositeKey]) {
      const updatedCart = { ...cartItems };
      const updatedQuantity = updatedCart[compositeKey] - 1;

      if (updatedQuantity <= 0) {
        delete updatedCart[compositeKey];
      } else {
        updatedCart[compositeKey] = updatedQuantity;
      }

      setCartItem(updatedCart);
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
