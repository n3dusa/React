# Movie Manager - Final Assignment

 Below is the detailed structure and functionality of the project.

---

## Features

### **1. User Registration**
- Fields: Name, Username, Year of Birth
- A new user can be registered using the above details.

---

### **2. Genre Management**
- Existing genres: Action, Comedy, Drama, Sci-Fi, Horror
- New genres can be added using the "Add Genre" feature.

> **Note**: Newly added genres will only appear after the page is refreshed.

---

### **3. Movie Management**
- Add a new movie with the following details:
  - Movie Title
  - Year of Release
  - Genre (selected from the list of available genres)
- Perform the following actions on movies:
  - Get Movie by ID: Enter a specific movie ID to fetch details.
  - Delete Movie: Remove a movie using its ID.

---

### **4. Search Movies**
- Search movies by a keyword (e.g., title or genre).
- Search results include:
  - Movie Title
  - Year
  - Genre

Example search results for the keyword `Sci-Fi`:
- Title: Inception (2010)  
- Title: Interstellar (2014)  
- Title: Tenet (2020)

---

### **5. Submit Reviews**
- Users can submit reviews for a specific movie by:
  1. Clicking on the movie.
  2. Filling out the following fields:
     - **Username**
     - **Stars** (Rating out of 5)
     - **Review Text**
- Reviews will be displayed below the respective movie.

---


### **6. 10 Movies per page**
- at the bottom of the page is button to change page.
- There is 10 movies per page.
---

## Known Limitations flaws
1. **Refreshing for New Genres**: 
   - Any new genres added will not appear in the dropdown until the page is refreshed.
   - When Genre is added it will say (genre already exists) but it just means that genre was added, didn't have time to fix that.
2. **Submitting Reviews**: 
   - To submit a review, the user must first click on a movie to load the review submission form, otherwise it's invicible.

---

## Application Structure
### **Main Sections**
1. **Register User**
   - Register users with their name, username, and year of birth.

2. **Add Genre**
   - Add new genres (appearing only after a refresh).

3. **Add New Movie**
   - Add movies with a title, year, and selected genre.

4. **Movie Actions**
   - Get movie details by ID.
   - Delete movies by ID.
   - Search movies using a keyword.

5. **Submit Reviews**
   - Submit ratings and text reviews for movies.

---

## Example Workflow

1. Register a new user.
2. Add a new genre (refresh to see it appear in the dropdown).
3. Add a new movie by selecting an existing genre.
4. Search for movies using a keyword (e.g., `Action`).
5. Click on a movie to open the review form.
6. Submit a review for the selected movie.

---

## Future Improvements
- Enable dynamic updates for new genres without requiring a page refresh.
- Enhance the review submission process for better usability.
- Expand search functionality to include additional filters.

---

### Created by: Samuel Dunder








# Open Data Exercise bransch Link - https://github.com/n3dusa/React/tree/OpenDataExercise
# Version Control Assingment bransch Link - https://github.com/n3dusa/React/tree/VersionControlAssingment
