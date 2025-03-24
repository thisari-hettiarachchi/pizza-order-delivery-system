import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});
  const [foodList, setFoodList] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const deliveryFee = 200;
  const url = "http://localhost:8080";
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [formType, setFormType] = useState("Login");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLogout = () => {

    // Clear user-related data
    localStorage.clear(); // Clears all localStorage data related to the user
    sessionStorage.clear(); // Optional: Clears sessionStorage if used

    localStorage.removeItem("userName");
    setCartItem([]); 
    console.log("User logged out and cart cleared");

    setUserName("");
    setIsLoggedIn(false);

    toast.success("Logged out successfully!");
    navigate("/", { replace: true }); 
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${url}/api/cart/getcart/${userName}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch cart items: ${response.status} ${response.statusText}`
        );
      }
      const cartData = await response.json();

      const formattedCartData = {};

      cartData.items.forEach((item) => {
        const compositeKey = `${item.itemId}|${item.size}`;
        formattedCartData[compositeKey] = {
          quantity: item.quantity,
          cartId: cartData.id, 
        };
      });

      if (JSON.stringify(cartItems) !== JSON.stringify(formattedCartData)) {
        setCartItem(formattedCartData);
        console.log("Fetched and formatted cart data:", formattedCartData);
      } else {
        console.log("Cart items are already up-to-date.");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItem({}); 
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
    if (!cartItems || !foodList) return;

    const cartDetails = Object.entries(cartItems)
      .map(([key, { quantity, cartId }]) => {
        const [itemId, size] = key.split("|");
        const item = foodList.find((food) => food.id === itemId);

        if (!item) {
          console.warn(`Item with ID ${itemId} not found in foodList`);
          return null;
        }

        return {
          name: item.name,
          size,
          quantity,
          cartId,
        };
      })
      .filter(Boolean); 

    console.log("Mapped Cart Items with Cart ID:", cartDetails);
  }, [cartItems, foodList]);

  const updateCartQuantity = async (itemId, size) => {
    const compositeKey = `${itemId}|${size}`;

    if (cartItems[compositeKey]) {
      const item = foodList.find((food) => food.id === itemId);
      const quantity = cartItems[compositeKey].quantity;
      const sizePrice = item.price[size] || 0;

      if (quantity > 1) {
        const updatedQuantity = quantity - 1;
        const updatedCart = { ...cartItems };
        updatedCart[compositeKey].quantity = updatedQuantity;
        setCartItem(updatedCart);

        const updatedCartItem = {
          userName,
          itemId,
          itemName: item.name,
          quantity: updatedQuantity,
          size,
          price: sizePrice,
        };

        try {
          const response = await axios.put(
            `${url}/api/cart/updatecart/${userName}`,
            updatedCartItem
          );

          if (response.status === 200) {
            toast.success("Item quantity updated in cart!");
            fetchCartItems();
          } else {
            toast.error("Failed to update item in cart.");
          }
        } catch (error) {
          console.error("Error updating item in cart:", error);
          toast.error("Failed to update item in cart.");
        }
      }
    } else {
      toast.error("Item not found in cart.");
    }
  };

  const removeFromCart = async (itemId, size) => {
    const compositeKey = `${itemId}|${size}`;
    const currentCartItems = { ...cartItems };

    if (currentCartItems[compositeKey]) {
      try {
        const response = await axios.delete(
          `${url}/api/cart/deletecart/${userName}/${itemId}/${size}`
        );
        if (response.status === 200) {
          delete currentCartItems[compositeKey];
          setCartItem(currentCartItems);
          toast.success("Item removed from cart!");
        } else {
          toast.error("Failed to remove item from cart.");
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
        toast.error("Failed to remove item from cart.");
      }
    } else {
      console.log("Item not found in cart for removal:", compositeKey);
      toast.error("Item not found in cart.");
    }
  };

  const deleteCart = async () => {
    try {
      const response = await axios.delete(
        `${url}/api/cart/deletecart/${userName}`
      );
      if (response.status === 200) {
        setCartItem({});
        toast.success("Item removed from cart!");
      } else {
        toast.error("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart.");
    }
  };

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
      setFoodList([]); 
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
    }
    loadData();
  }, []);

  const getTotalPrice = () => {
    if (!cartItems || !foodList) return 0; 

    return Object.entries(cartItems).reduce(
      (total, [compositeKey, { quantity }]) => {
        const [itemId, size] = compositeKey.split("|");
        const item = foodList.find((food) => food.id === itemId);

        if (item && item.price && item.price[size]) {
          const sizePrice = item.price[size]; 
          total += sizePrice * quantity;
        } else {
          console.warn(
            `Item with ID: ${itemId} or size: ${size} not found or price missing.`
          );
        }

        return total;
      },
      0
    );
  };

  const lastTotalPrice = () => {
    const subtotal = getTotalPrice();
    const discountAmount = (subtotal * discount) / 100; 
    return subtotal > 0 ? subtotal - discountAmount + deliveryFee : 0;
  };

  const validatePromoCode = (code) => {
    const validPromoCodes = {
      DISCOUNT10: 10,
      DISCOUNT20: 20,
    };
    if (validPromoCodes[code]) {
      setDiscount(validPromoCodes[code]);
      toast.success(`Promo code applied! ${validPromoCodes[code]}% discount.`);
    } else {
      setDiscount(0);
      toast.error("Invalid promo code. Please try again.");
    }
  };

  const getTotalItems = () => {
    if (!cartItems || Object.keys(cartItems).length === 0) return 0;

    return Object.values(cartItems).reduce((total, item) => {
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + quantity;
    }, 0); 
  };

  const contextValue = {
    formType,
    setFormType,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    handleLogout,
    scrollTop,
    foodList,
    cartItems,
    updateCartQuantity,
    removeFromCart,
    deleteCart,
    getTotalItems,
    deliveryFee,
    getTotalPrice,
    lastTotalPrice,
    validatePromoCode,
    setPromoCode,
    promoCode,
    discount,
    fetchCartItems,
    setCartItem,
    url,
    user,
    setUser,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
