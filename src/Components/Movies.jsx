import React, { useState, useMemo } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://api.tvmaze.com/shows")
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { movies, loading, error };
};



const Movies = ({ searchTerm }) => {
  const { movies, loading, error } = useMovies();
  const [selectedGenre, setSelectedGenre] = useState(''); 


  const filteredMovies = useMemo(() => {
    return movies
      .filter(movie =>
       
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(movie =>
      
        selectedGenre ? movie.genres.includes(selectedGenre) : true
      );
  }, [movies, searchTerm, selectedGenre]);


  const allGenres = useMemo(() => {
    const genres = new Set();
    movies.forEach(movie => {
      movie.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
  }, [movies]);


  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 text-white border-solid border-current border-r-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <section>
      <div className="bg-[#13131a] min-h-screen">
        <div className="container py-10 mx-auto">
          
          {/* --- NEW: GENRE FILTER DROPDOWN --- */}
          <div className="mb-8 flex justify-end">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-[#1a1a24] text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All Genres</option>
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* --- MOVIE GRID --- */}
          {/* We now map over the *filteredMovies* array */}
          {filteredMovies.length > 0 ? (
            <div className="flex gap-4 sm:gap-10 items-start justify-center flex-wrap">
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="moviebox max-w-[240px]">
                  <Link to={`/movie/${movie.id}`}>
                    <div className="poster rounded-lg h-[340px] w-[240px] relative overflow-hidden group">
                      <img
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        src={movie.image.original}
                        alt={movie.name}
                      />
                    </div>
                  </Link>
                  <div className="details text-white text-center mt-3">
                    <h2 className="text-xl font-bold truncate">{movie.name}</h2>
                    <p className="font-semibold text-gray-400 text-sm">{movie.genres.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-xl">No movies found matching your criteria.</p>
          )}

        </div>
      </div>
    </section>
  );
};

export default Movies;
