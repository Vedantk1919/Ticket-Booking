import React, { useState } from 'react';


const Seat = ({ id, isSelected, isUnavailable, onSelect }) => {
  const getSeatColor = () => {
    if (isUnavailable) return 'bg-gray-800 cursor-not-allowed';
    if (isSelected) return 'bg-orange-500';
    return 'bg-gray-600 hover:bg-gray-500';
  };

  return (
    <div
      className={`w-8 h-8 m-1 rounded-md transition-colors ${getSeatColor()}`}
      onClick={() => !isUnavailable && onSelect(id)}
    />
  );
};


const SeatSelection = ({ movie, onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const SEAT_PRICE = 12;

 
  const unavailableSeats = ['A3', 'C5', 'F2', 'F3'];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 8;

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId) 
        : [...prev, seatId] 
    );
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    const bookingDetails = {
      movie: movie,
      seats: selectedSeats,
      totalPrice: selectedSeats.length * SEAT_PRICE,
    };
    onConfirm(bookingDetails);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1a1a24] text-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Select Your Seats for {movie.name}</h2>
        
        {/* Screen */}
        <div className="w-full h-2 bg-white rounded-t-full mb-6 shadow-lg shadow-white/20"></div>

        {/* Seats */}
        <div className="flex flex-col items-center">
          {rows.map(row => (
            <div key={row} className="flex">
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatId = `${row}${i + 1}`;
                return (
                  <Seat
                    key={seatId}
                    id={seatId}
                    isSelected={selectedSeats.includes(seatId)}
                    isUnavailable={unavailableSeats.includes(seatId)}
                    onSelect={handleSeatSelect}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center space-x-4 mt-6 text-sm">
            <div className="flex items-center"><div className="w-4 h-4 bg-gray-600 rounded-md mr-2"></div>Available</div>
            <div className="flex items-center"><div className="w-4 h-4 bg-orange-500 rounded-md mr-2"></div>Selected</div>
            <div className="flex items-center"><div className="w-4 h-4 bg-gray-800 rounded-md mr-2"></div>Unavailable</div>
        </div>

        {/* Booking Info & Actions */}
        <div className="mt-6 border-t border-gray-700 pt-4">
          {selectedSeats.length > 0 ? (
            <div>
              <p><span className="font-bold">Seats:</span> {selectedSeats.join(', ')}</p>
              <p className="text-xl font-bold mt-2">
                Total: ${selectedSeats.length * SEAT_PRICE}
              </p>
            </div>
          ) : (
            <p className="text-gray-400">Please select your seats.</p>
          )}
          <div className="flex justify-end space-x-4 mt-4">
            <button onClick={onClose} className="border border-gray-600 px-6 py-2 rounded hover:bg-gray-700">Cancel</button>
            <button onClick={handleConfirm} className="bg-orange-500 px-6 py-2 rounded hover:bg-orange-600">Confirm Booking</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
