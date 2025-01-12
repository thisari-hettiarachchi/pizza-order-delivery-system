import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});
  const [foodList, setFoodList] = useState([]);
  const url = "http://localhost:8080";

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
    console.log(foodList); // This will log the updated foodList after it changes
  }, [foodList]);

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
    }
    loadData();
  }, []);

  // Calculate the total price of the items in the cart
  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [compositeKey, count]) => {
      const [itemId, size] = compositeKey.split("|");
      const item = foodList.find((food) => food.id === itemId);

      if (item) {
        const sizePrice = item.price[size] || 0;
        total += sizePrice * count;
      } else {
        console.warn(`Food item with ID ${itemId} not found in foodList.`);
      }

      return total;
    }, 0);
  };

  // Calculate the final total price including delivery fee
  const lastTotalPrice = () => {
    const deliveryFee = 200;
    const subtotal = getTotalPrice();
    return subtotal > 0 ? subtotal + deliveryFee : 0;
  };

  // Get the total number of items in the cart
  const getTotalItems = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  // Add item to the cart
  const addToCart = (itemId, size, quantity = 1) => {
    console.log("Adding to cart:", itemId, size); // Debugging log

    if (!itemId || !size) {
      console.warn("Invalid itemId or size:", itemId, size);
      return;
    }

    const compositeKey = `${itemId}|${size}`;
    setCartItem((prev) => ({
      ...prev,
      [compositeKey]: (prev[compositeKey] || 0) + quantity,
    }));
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
  useEffect(() => {
    if (foodList.length === 0) return; // Ensure foodList is populated

    console.log(
      "Cart Items:",
      Object.entries(cartItems).map(([key, count]) => {
        const [itemId, size] = key.split("|");
        const item = foodList.find((food) => food.id === itemId);

        if (!item) {
          console.warn(`Food item with ID ${itemId} not found in foodList.`);
        }

        return {
          name: item?.name,
          size,
          quantity: count,
        };
      })
    );
  }, [cartItems, foodList]);

  const contextValue = {
    foodList,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    lastTotalPrice,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
