import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Invoice = () => {
  const { latestOrder } = useCart();

  // This handles the case where a user navigates to /invoice directly
  if (!latestOrder) {
    return (
      <div className="bg-[#13131a] min-h-screen text-white p-10 text-center">
        <div className="max-w-md mx-auto bg-[#1a1a24] p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-yellow-400">No Order Found</h1>
          <p className="mt-2">It looks like you haven't completed a transaction.</p>
          <Link to="/" className="mt-6 inline-block bg-orange-500 px-8 py-3 rounded-lg hover:bg-orange-600 font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  // This calculates the total price from the items in the order
  const orderTotal = latestOrder.items.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="bg-[#13131a] min-h-screen text-white p-4 sm:p-10">
      <div className="max-w-2xl mx-auto bg-[#1a1a24] p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400">Thank You!</h1>
          <p className="mt-2 text-lg">Your booking is confirmed.</p>
        </div>
        <div className="border-y border-gray-700 py-4">
          <h2 className="text-2xl font-semibold mb-4">Order Summary (#{latestOrder.orderId})</h2>
          {/* This maps over the items from the completed order */}
          {latestOrder.items.map(item => (
            <div key={item.id} className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-lg">{item.movie.name}</p>
                <p className="text-sm text-gray-400">Seats: {item.seats.join(', ')}</p>
              </div>
              <p className="font-semibold text-lg">${item.totalPrice}</p>
            </div>
          ))}
          <div className="mt-4 border-t border-gray-700 pt-4 flex justify-between text-xl font-bold">
            <p>Total Paid</p>
            <p>${orderTotal}</p>
          </div>
        </div>
        <div className="text-center mt-8 space-x-4">
          <Link to="/" className="bg-gray-600 px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold">
            Back to Home
          </Link>
          <Link to="/tickets" className="bg-orange-500 px-6 py-3 rounded-lg hover:bg-orange-600 font-semibold">
            View My Tickets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

