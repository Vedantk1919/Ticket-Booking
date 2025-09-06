import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

// --- Full SVG Icon Components ---
const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2H5z" />
  </svg>
);
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const CartIcon = ({ itemCount }) => (
    <div className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;

  return (
    <nav className="bg-[#1a1a24] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          {/* --- NAME UPDATED HERE --- */}
          <span className="text-2xl font-bold text-white">Seatify</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-orange-400">Home</Link>
          <Link to="/concerts" className="hover:text-orange-400">Concerts</Link>
          <Link to="/theaters" className="hover:text-orange-400">Theater Events</Link>
          <Link to="/tickets" className="hover:text-orange-400">My Tickets</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="hover:text-orange-400">Login</Link>
            <Link to="/register" className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600">Register</Link>
            <Link to="/cart" className="hover:text-orange-400 p-2"><CartIcon itemCount={cartItemCount} /></Link>
        </div>
        
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="hover:text-orange-400 mr-4"><CartIcon itemCount={cartItemCount} /></Link>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden px-6 pt-2 pb-4 flex flex-col space-y-3">
          <Link to="/" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/concerts" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>Concerts</Link>
          <Link to="/theaters" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>Theater Events</Link>
          <Link to="/tickets" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>My Tickets</Link>
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
            <Link to="/login" className="hover:text-orange-400 w-full text-center py-2 rounded border border-gray-600">Login</Link>
            <Link to="/register" className="bg-orange-500 w-full text-center py-2 rounded hover:bg-orange-600">Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

