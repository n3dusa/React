import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList.jsx';
import MovieForm from './components/MovieForm.jsx';
import GenreForm from './components/GenreForm.jsx';
import GenreList from './components/GenreList.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import MovieActions from './components/MovieActions.jsx';
import MovieReview from './components/MovieReview.jsx'; 

function App() {
  const [movies, setMovies] = useState([]); // Ensure it's always an array
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); // <-- Track selected movie

  // Pagination state
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages

  // Fetch movies from the server with pagination
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/movies?page=${page}&limit=10`);
        if (response.ok) {
          const data = await response.json();
          setMovies(data.movies || []); // Safely set movies
          setTotalPages(data.totalPages || 1); // Ensure totalPages has a fallback value
        } else {
          setError('Failed to fetch movies');
        }
      } catch (error) {
        setError('Error fetching movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]); // Re-run when the page state changes

  // Fetch genres from the server
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:5000/genres');
        if (response.ok) {
          const data = await response.json();
          setGenres(data);
        } else {
          setError('Failed to fetch genres');
        }
      } catch (error) {
        setError('Error fetching genres');
      }
    };

    fetchGenres();
  }, []); // Runs once when the component mounts

  // Handle user registration
  const handleUserRegistration = (newUser) => {
    setUser(newUser);
    setSuccess('Registration successful!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Add a new movie
  const handleAddMovie = async (newMovie) => {
    try {
      const response = await fetch('http://localhost:5000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });
      if (response.ok) {
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, data]);
        setSuccess('Movie added successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to add movie');
      }
    } catch (error) {
      setError('Error adding movie');
    }
  };

  // Add a new genre and update state
  const handleAddGenre = async (newGenre) => {
    try {
      const response = await fetch('http://localhost:5000/genres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genre: newGenre }), // Send genre as an object with the genre key
      });

      if (response.ok) {
        const data = await response.json();
        setGenres((prevGenres) => [...prevGenres, newGenre]); // Update genres state
        setSuccess('Genre added successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to add genre');
        } else {
          setError('Unexpected response from the server.');
        }
      }
    } catch (error) {
      console.error('Error adding genre:', error);
      setError('Error adding genre.');
    }
  };

  // Handle movie selection
  const handleSelectMovie = (movieId) => {
    const movie = movies.find((movie) => movie.id === movieId);
    setSelectedMovie(movie);
  };

  return (
    <div>
      <h1>Movie Manager</h1>

      {/* Display success/error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* User Registration */}
      <RegisterForm onRegister={handleUserRegistration} />

      {/* Genre Management */}
      <GenreForm onAddGenre={handleAddGenre} /> {/* Pass handleAddGenre directly */}
      <GenreList genres={genres} />

      {/* Movie Management */}
      <MovieForm onSave={handleAddMovie} genres={genres} />

      {/* Movie Actions (e.g., Edit, Delete) */}
      <MovieActions movies={movies} setMovies={setMovies} />

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        Array.isArray(movies) && movies.length > 0 ? (
          <MovieList movies={movies} onMovieSelect={handleSelectMovie} />
        ) : (
          <p>No movies found.</p>
        )
      )}

      {/* Movie Review */}
      {selectedMovie && (
        <MovieReview movieId={selectedMovie.id} />
      )}

      {/* Pagination Controls */}
      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
