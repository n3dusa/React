import React, { useEffect, useState } from 'react';

function GenreList({ genres }) {
  const [error, setError] = useState('');

  return (
    <div>
      <h2>Genres</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}

export default GenreList;






