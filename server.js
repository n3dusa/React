import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 5000;
const MOVIE_DATA_PATH = './movies.json';
const GENRE_DATA = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror"]; // Example genres data

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Adjust if your frontend runs on a different port
app.use(express.json());

// Load movies from the JSON file (persistent storage)
let movies = [];
if (fs.existsSync(MOVIE_DATA_PATH)) {
  try {
    const fileData = fs.readFileSync(MOVIE_DATA_PATH, 'utf8');
    movies = JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading movies.json:', error);
  }
}

// Save movies to the JSON file
const saveMovies = () => {
  try {
    fs.writeFileSync(MOVIE_DATA_PATH, JSON.stringify(movies, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving movies.json:', error);
  }
};

// POST /movies/:id/review to handle movie reviews
app.post('/movies/:id/review', (req, res) => {
  const { id } = req.params;
  const { username, stars, reviewText } = req.body;

  // Validate the required fields
  if (!username || !stars || !reviewText) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Find the movie by ID
  const movie = movies.find((m) => m.id === parseInt(id, 10));
  
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  // Create the new review
  const newReview = { username, stars, reviewText, date: new Date() };

  // Add the review to the movie's reviews (create an array if none exists)
  movie.reviews = movie.reviews || [];
  movie.reviews.push(newReview);

  // Save the updated movies list
  saveMovies();

  // Send response
  res.status(201).json({ message: 'Review added successfully', review: newReview });
});

// Paginated route for movies with optional keyword search
app.get('/movies', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const keyword = req.query.keyword || ''; // Keyword for search
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let filteredMovies = movies;

  if (keyword) {
    // Filter movies by keyword (case-insensitive match)
    filteredMovies = movies.filter((movie) => 
      movie.title.toLowerCase().includes(keyword.toLowerCase()) ||
      movie.genre.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
  res.json({
    movies: paginatedMovies,
    totalMovies: filteredMovies.length,
    totalPages: Math.ceil(filteredMovies.length / limit),
    currentPage: page,
  });
});

// Get a movie by ID
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((m) => m.id === parseInt(id, 10));

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.json(movie);
});

// Add a new movie with duplicate check
app.post('/movies', (req, res) => {
  const { title, year, genre } = req.body;

  if (!title || !year || !genre) {
    return res.status(400).json({ error: 'All fields (title, year, genre) are required' });
  }

  // Check if the movie already exists
  const movieExists = movies.some(
    (movie) => movie.title === title && movie.year === year && movie.genre === genre
  );

  if (movieExists) {
    return res.status(400).json({ error: 'Movie already exists' });
  }

  const newMovie = { id: movies.length + 1, title, year, genre };
  movies.push(newMovie);
  saveMovies();
  res.status(201).json(newMovie);
});

// POST /genres route
app.post('/genres', (req, res) => {
  const { genre } = req.body;

  if (!genre || typeof genre !== 'string') {
    return res.status(400).json({ error: 'Genre is required and must be a string' });
  }

  if (GENRE_DATA.includes(genre)) {
    return res.status(400).json({ error: 'Genre already exists' });
  }

  GENRE_DATA.push(genre);
  res.status(201).json({ message: 'Genre added successfully', genres: GENRE_DATA });
});

// Get genres (static data for now)
app.get('/genres', (req, res) => {
  res.json(GENRE_DATA);
});

// Register a new user
let users = [];

app.post('/users/register', (req, res) => {
  const { name, username, yearOfBirth } = req.body;

  // Validate inputs
  if (!name || !username || !yearOfBirth) {
    return res.status(400).json({ error: 'All fields (name, username, yearOfBirth) are required' });
  }

  // Check if username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Add new user
  const newUser = { id: users.length + 1, name, username, yearOfBirth };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

