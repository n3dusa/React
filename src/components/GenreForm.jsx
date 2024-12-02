import React, { useState } from 'react';

function GenreForm({ onAddGenre }) {
  const [newGenre, setNewGenre] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newGenre.trim()) {
      try {
        const response = await fetch("http://localhost:5000/genres", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ genre: newGenre }), 
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Genre added:', data);
          onAddGenre(newGenre); 
          setNewGenre(''); 
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to add genre. Please try again.');
        }
      } catch (error) {
        console.error('Error adding genre:', error);
        setError('An error occurred while adding the genre.');
      }
    } else {
      setError('Genre cannot be empty.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={newGenre}
        onChange={(e) => setNewGenre(e.target.value)}
        placeholder="Add genre"
      />
      <button type="submit">Add Genre</button>
    </form>
  );
}

export default GenreForm;





