import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]); // State for history

  const addToCart = (booking) => {
    setCartItems((prevItems) => [...prevItems, booking]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  
  const checkout = () => {
    // Create a structured order object with a unique ID and date
    const newOrder = { 
      orderId: Date.now(), 
      date: new Date(), 
      items: cartItems 
    };

    // Add the new order to the beginning of the history array
    setOrderHistory((prevHistory) => [newOrder, ...prevHistory]); 
    
    setLatestOrder(newOrder); // Save for the immediate invoice page
    setCartItems([]); // Clear the cart
  };

  const value = {
    cartItems,
    latestOrder,
    orderHistory, // Expose the history to other components
    addToCart,
    removeFromCart,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

