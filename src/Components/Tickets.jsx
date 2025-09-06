import React from 'react';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';

const Tickets = () => {
  const { orderHistory } = useCart();

  return (
    <div className="bg-[#13131a] min-h-screen text-white p-4 sm:p-10">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 border-b border-gray-700 pb-4">My Tickets / Order History</h1>
        
        {orderHistory.length === 0 ? (
          <div className="bg-[#1a1a24] p-8 rounded-lg text-center">
            <p className="text-xl text-gray-400">You have no past orders.</p>
            <Link to="/" className="mt-4 inline-block bg-orange-500 px-6 py-2 rounded hover:bg-orange-600">
              Book Your First Ticket
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orderHistory.map((order) => {
              const orderTotal = order.items.reduce((total, item) => total + item.totalPrice, 0);
              return (
                <div key={order.orderId} className="bg-[#1a1a24] p-6 rounded-lg shadow-lg">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-700 pb-3 mb-3">
                    <div>
                      <h2 className="text-xl font-bold">Order #{order.orderId}</h2>
                      <p className="text-sm text-gray-400">
                        {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <p className="text-lg font-bold">${orderTotal}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <img src={item.movie.image.medium} alt={item.movie.name} className="w-16 h-24 object-cover rounded-md" />
                        <div>
                           <p className="font-bold">{item.movie.name}</p>
                           <p className="text-sm text-gray-400">Date: {new Date(item.showtime.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {item.showtime.time}</p>
                           <p className="text-sm text-gray-400">Seats: <span className="text-orange-400">{item.seats.join(', ')}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
