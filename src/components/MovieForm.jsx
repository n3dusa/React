import React, { useState } from 'react';

function MovieForm({ onSave, genres }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State to prevent multiple submissions

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);
    console.log('Form submitted'); // Debugging log

    const newMovie = { title, year, genre };

    try {
      const response = await fetch('http://localhost:5000/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
      });

      if (response.ok) {
        const addedMovie = await response.json();
        console.log('Movie added:', addedMovie); // Debugging log
        onSave(addedMovie);
        setTitle('');
        setYear('');
        setGenre('');
        setError('');
        setSuccess('Movie added successfully!');
        setTimeout(() => setSuccess(''), 3000); // Clear success message
      } else {
        const errorDetails = await response.json();
        setError(`Error: ${errorDetails.error || 'Failed to add movie'}`);
        setSuccess('');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccess('');
    } finally {
      setIsSubmitting(false); // Reset the state
    }
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie Title"
          required
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          required
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="">Select Genre</option>
          {genres &&
            genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
        </select>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Movie'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default MovieForm;


