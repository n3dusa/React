import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomMeal = () => {
  const [meal, setMeal] = useState(null);

  const fetchRandomMeal = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      setMeal(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  return (
    <div>
      {meal ? (
        <div>
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <p>{meal.strInstructions}</p>
          <button onClick={fetchRandomMeal}>Get Another Random Meal</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomMeal;

