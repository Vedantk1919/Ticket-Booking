import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext.jsx";


import Layout from "./Components/Layout.jsx";
import Home from "./Components/Home.jsx";
import Concerts from "./Components/Concerts.jsx";
import Theaters from "./Components/Theaters.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import MovieDetails from "./Components/MovieDetails.jsx";
import Cart from "./Components/Cart.jsx";
import Checkout from "./Components/Checkout.jsx";
import Invoice from "./Components/Invoice.jsx";
import Tickets from "./Components/Tickets.jsx"; 

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="concerts" element={<Concerts />} />
          <Route path="theaters" element={<Theaters />} />
          <Route path="tickets" element={<Tickets />} /> {/* New Route */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="invoice" element={<Invoice />} />
        </Route>
      </Routes>
    </CartProvider>
  );
};

export default App;

