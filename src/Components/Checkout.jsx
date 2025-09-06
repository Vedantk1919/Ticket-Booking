import React from 'react';
import { useCart } from '../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, checkout } = useCart();
  const navigate = useNavigate();

  const totalCartPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkout();
    navigate('/invoice');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="bg-[#13131a] min-h-screen text-white p-10 text-center">
        <h2 className="text-2xl">Your cart is empty.</h2>
        <Link to="/" className="text-orange-400 hover:underline mt-4 inline-block">Go back to browsing</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#13131a] min-h-screen text-white p-4 sm:p-10">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1a1a24] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Order Summary</h2>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <p>{item.movie.name} (x{item.seats.length})</p>
                <p className="font-semibold">${item.totalPrice}</p>
              </div>
            ))}
            <div className="mt-4 border-t border-gray-700 pt-4 flex justify-between text-xl font-bold">
              <p>Total</p>
              <p>${totalCartPrice}</p>
            </div>
          </div>
          <div className="bg-[#1a1a24] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Card Number</label>
                <input type="text" placeholder="**** **** **** ****" className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:outline-none focus:border-orange-500" required />
              </div>
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-2">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:outline-none focus:border-orange-500" required />
                </div>
                <div className="w-1/2">
                  <label className="block mb-2">CVC</label>
                  <input type="text" placeholder="123" className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:outline-none focus:border-orange-500" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-orange-500 font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors mt-4">
                Pay ${totalCartPrice}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;