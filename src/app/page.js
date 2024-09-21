"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Slider from "react-slick";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data, error } = await supabase.from('movies').select();
      if (error) {
        console.error('Error fetching movies:', error);
      } else {
        console.log('Fetched movies:', data); // Check this output
        setMovies(data);
      }
    };
    fetchMovies();
  }, []);

  const filterByGenre = () => {
    console.log('Filtering movies for genre:', genre); // Log the genre being searched
    const filtered = movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    console.log('Filtered movies:', filtered); // Log the filtered results
    setFilteredMovies(filtered);
  };

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Carousel */}
      <Slider {...settings}>
        <div>
          <img src="/path/to/image1.jpg" alt="Image 1" className="w-full h-48 object-cover rounded" />
        </div>
        <div>
          <img src="/path/to/image2.jpg" alt="Image 2" className="w-full h-48 object-cover rounded" />
        </div>
        <div>
          <img src="/path/to/image3.jpg" alt="Image 3" className="w-full h-48 object-cover rounded" />
        </div>
      </Slider>

      <h1 className="text-3xl font-bold mb-4">Movie Recommendation System</h1>
      
      {/* Input for the genre */}
      <input
        type="text"
        placeholder="Enter Genre (e.g. Action)"
        className="p-2 border rounded mb-4 w-full"
        value={genre}
        onChange={(e) => {
          console.log('Genre input:', e.target.value); // Log the input value
          setGenre(e.target.value);
        }}
      />
      
      {/* Button to trigger filtering */}
      <button
        onClick={filterByGenre}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Search Movies
      </button>

      {/* Display the filtered movie list */}
      <div className="mt-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="p-4 border rounded mb-2">
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <p>Genre: {movie.genre}</p>
              <p>Rating: {movie.rating}/10</p>
            </div>
          ))
        ) : (
          <p>{genre ? "No movies found for this genre." : "Please enter a genre to search."}</p>
        )}
      </div>
    </div>
  );
}
