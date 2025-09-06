import React from 'react';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';

// --- FIXED: The actual SVG code for the Trash Icon ---
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const totalCartPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="bg-[#13131a] min-h-screen text-white p-4 sm:p-10">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 border-b border-gray-700 pb-4">My Cart</h1>
        
        {cartItems.length === 0 ? (
          // --- FIXED: The actual JSX for the empty cart view ---
          <div className="bg-[#1a1a24] p-8 rounded-lg text-center">
            <p className="text-xl text-gray-400">Your cart is currently empty.</p>
            <Link to="/" className="mt-4 inline-block bg-orange-500 px-6 py-2 rounded hover:bg-orange-600">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="bg-[#1a1a24] p-4 rounded-lg mb-4 flex gap-4 items-center">
                <img src={item.movie.image.medium} alt={item.movie.name} className="w-20 sm:w-24 h-auto rounded-md" />
                <div className="flex-grow">
                  <h2 className="text-xl sm:text-2xl font-bold">{item.movie.name}</h2>
                  
                  <div className="text-sm text-gray-400 mt-1">
                    <p>Date: <span className="font-semibold text-white">{new Date(item.showtime.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</span></p>
                    <p>Time: <span className="font-semibold text-white">{item.showtime.time}</span></p>
                  </div>
                  
                  <p className="text-gray-400 text-sm sm:text-base mt-1">Seats: <span className="font-semibold text-orange-400">{item.seats.join(', ')}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xl sm:text-2xl font-bold">${item.totalPrice}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition-colors p-2">
                  <TrashIcon />
                </button>
              </div>
            ))}

            <div className="mt-6 border-t border-gray-700 pt-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Total</h2>
                <p className="text-3xl font-bold">${totalCartPrice}</p>
            </div>
            
            <div className="text-right mt-6">
                <Link to="/checkout" className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors">
                    Proceed to Checkout
                </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

