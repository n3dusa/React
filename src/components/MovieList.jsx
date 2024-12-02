import React from 'react';

function MovieList({ movies, onMovieSelect }) {
  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <li
              key={movie.id}
              onClick={() => onMovieSelect(movie.id)} // Trigger movie selection
              style={{
                cursor: 'pointer',
                padding: '10px',
                border: '1px solid #ccc',
                marginBottom: '5px',
                borderRadius: '5px',
              }}
            >
              <strong>ID:</strong> {movie.id} - <strong>Title:</strong> {movie.title} (
              {movie.year}) - <strong>Genre:</strong> {movie.genre}
            </li>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </ul>
    </div>
  );
}

export default MovieList;

