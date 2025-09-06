import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]); 

  const addToCart = (booking) => {
    setCartItems((prevItems) => [...prevItems, booking]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  
  const checkout = () => {
    
    const newOrder = { 
      orderId: Date.now(), 
      date: new Date(), 
      items: cartItems 
    };

    
    setOrderHistory((prevHistory) => [newOrder, ...prevHistory]); 
    
    setLatestOrder(newOrder); 
    setCartItems([]);
  };

  const value = {
    cartItems,
    latestOrder,
    orderHistory, 
    addToCart,
    removeFromCart,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

