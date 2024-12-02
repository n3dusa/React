import React, { useState, useEffect } from 'react';

const MovieReview = ({ movieId }) => {
  const [username, setUsername] = useState('');
  const [stars, setStars] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [existingReviews, setExistingReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/movies/${movieId}`);
        const data = await response.json();
        setExistingReviews(data.reviews || []);
      } catch (error) {
        setError('Error fetching reviews');
      }
    };

    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !reviewText || stars < 1 || stars > 5) {
      setError('Please fill in all fields with valid values.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/movies/${movieId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, stars, reviewText }),
      });

      if (response.ok) {
        setSuccessMessage('Review added successfully!');
        setUsername('');
        setStars(1);
        setReviewText('');
        // Fetch updated reviews
        const updatedResponse = await fetch(`http://localhost:5000/movies/${movieId}`);
        const updatedData = await updatedResponse.json();
        setExistingReviews(updatedData.reviews || []);
      } else {
        const result = await response.json();
        setError(result.error || 'Error submitting review');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Submit Review</h2>
      {isLoading ? (
        <p>Submitting your review...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Stars:
              <select value={stars} onChange={(e) => setStars(Number(e.target.value))} required>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </label>
          </div>

          <div>
            <label>
              Review Text:
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              ></textarea>
            </label>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          <button type="submit">Submit Review</button>
        </form>
      )}

      {existingReviews.length > 0 && (
        <div>
          <h3>Existing Reviews</h3>
          <ul>
            {existingReviews.map((review, index) => (
              <li key={index}>
                <strong>{review.username}</strong> ({review.stars} stars)
                <p>{review.reviewText}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieReview;

