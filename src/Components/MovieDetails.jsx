import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/CartContext";
import SeatSelection from "./SeatSelection";

const getNextSevenDays = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      fullDate: date.toISOString().split('T')[0],
      day: days[date.getDay()],
      date: date.getDate(),
    });
  }
  return dates;
};

const showtimes = {
  Afternoon: ["12:00 PM", "2:30 PM", "5:00 PM"],
  Evening: ["7:30 PM", "9:00 PM"],
  Night: ["10:45 PM", "11:30 PM"],
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [movie, setMovie] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [dates] = useState(getNextSevenDays());
  const [selectedDate, setSelectedDate] = useState(dates[0].fullDate);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error("Error fetching movie details:", error))
      .finally(() => setLoading(false));
  }, [id]);
  
  const handleBookingConfirm = (bookingDetails) => {
    const bookingWithId = { 
        ...bookingDetails, 
        id: Date.now(),
        showtime: { date: selectedDate, time: selectedTime }
    };
    addToCart(bookingWithId);
    setIsModalOpen(false);
    navigate('/cart');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setIsModalOpen(true);
  };

 
  if (loading) {
    return (
      <div className="bg-[#13131a] min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 text-white border-solid border-current border-r-transparent"></div>
      </div>
    );
  }

  
  if (!movie) {
    return <div className="bg-[#13131a] min-h-screen text-white text-center p-10">Movie not found.</div>;
  }
  

  return (
    <>
      <div className="bg-[#13131a] min-h-screen text-white p-4 md:p-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            <img 
              src={movie.image.original} 
              alt={movie.name}
              className="w-full md:w-1/4 h-auto object-cover rounded-lg shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{movie.name}</h1>
              <p className="text-lg text-gray-400 mb-4">
                {movie.premiered} | {movie.genres.join(", ")} | {movie.status}
              </p>
              <div 
                className="text-gray-300 leading-relaxed max-w-3xl"
                dangerouslySetInnerHTML={{ __html: movie.summary }} 
              />
            </div>
          </div>

          <div className="mt-10 border-t border-gray-700 pt-6">
            <h2 className="text-3xl font-bold mb-4">Select Date & Showtime</h2>
            <div className="flex space-x-2 overflow-x-auto pb-4">
              {dates.map(d => (
                <button 
                  key={d.fullDate}
                  onClick={() => setSelectedDate(d.fullDate)}
                  className={`px-4 py-2 rounded-lg transition-colors min-w-[70px] ${selectedDate === d.fullDate ? 'bg-orange-500 text-white' : 'bg-[#1a1a24] hover:bg-gray-700'}`}
                >
                  <p className="font-bold">{d.day}</p>
                  <p className="text-2xl">{d.date}</p>
                </button>
              ))}
            </div>
            
            <div className="mt-6">
              {Object.entries(showtimes).map(([period, times]) => (
                <div key={period} className="mb-4">
                  <h3 className="font-semibold text-gray-400 mb-2">{period}</h3>
                  <div className="flex flex-wrap gap-3">
                    {times.map(time => (
                      <button 
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className="border border-gray-600 px-6 py-2 rounded-md hover:bg-orange-500 hover:border-orange-500 transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <SeatSelection
          movie={movie}
          showtime={{ date: selectedDate, time: selectedTime }}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleBookingConfirm}
        />
      )}
    </>
  );
};

export default MovieDetails;

