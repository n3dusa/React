import React, { useState } from 'react';
import axios from 'axios';

const SearchMeal = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);

  const searchMeals = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      setMeals(response.data.meals || []);
    } catch (error) {
      console.error("Error searching meals:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a meal"
      />
      <button onClick={searchMeals}>Search</button>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>{meal.strMeal}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMeal;



