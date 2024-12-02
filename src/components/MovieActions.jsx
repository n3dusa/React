import React, { useState } from 'react';

const MovieActions = () => {
  const [movieId, setMovieId] = useState('');
  const [keyword, setKeyword] = useState('');
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch a movie by ID
  const fetchMovieById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/movies/${movieId}`);
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
        setMovies([]); // Clear keyword search results
        setMessage('');
      } else {
        setMessage('Movie not found');
        setMovie(null);
      }
    } catch (error) {
      setMessage('Error fetching movie');
    }
  };

  // Fetch movies by keyword
  const fetchMoviesByKeyword = async () => {
    try {
      const response = await fetch(`http://localhost:5000/movies?keyword=${keyword}`);
      if (response.ok) {
        const data = await response.json();
        setMovies(data.movies || []);
        setMovie(null); // Clear movie details from ID search
        setMessage('');
      } else {
        setMessage('No movies found with that keyword');
        setMovies([]);
      }
    } catch (error) {
      setMessage('Error fetching movies');
    }
  };

 //Delete movie by ID
  const deleteMovieById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/movies/${movieId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setMovie(null); // Clear movie display after deletion
      } else {
        const errorData = await response.json();
        setMessage(errorData.error);
      }
    } catch (error) {
      setMessage('Error deleting movie');
    }
  };

  return (
    <div>
      <h3>Movie Actions</h3>

      {/* Movie ID search and Delete button */}
      <input
        type="number"
        placeholder="Enter movie ID"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
      />
      <button onClick={fetchMovieById}>Get Movie by ID</button>
      <button onClick={deleteMovieById}>Delete Movie</button>

      {/* Movie Keyword search */}
      <input
        type="text"
        placeholder="Search movies by keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={fetchMoviesByKeyword}>Search Movies by Keyword</button>

      {/* Display movie details or search results */}
      {movie && (
        <div>
          <h4>Movie Details:</h4>
          <p>Title: {movie.title}</p>
          <p>Year: {movie.year}</p>
          <p>Genre: {movie.genre}</p>
        </div>
      )}

      {movies.length > 0 && (
        <div>
          <h4>Search Results:</h4>
          {movies.map((movie) => (
            <div key={movie.id}>
              <p>Title: {movie.title}</p>
              <p>Year: {movie.year}</p>
              <p>Genre: {movie.genre}</p>
            </div>
          ))}
        </div>
      )}

      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default MovieActions;

