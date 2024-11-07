import React, { useState } from 'react';
import axios from 'axios';

const FilterMeals = ({ filterType, filterValue }) => {
  const [meals, setMeals] = useState([]);

  const filterMeals = async () => {
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${filterType}=${filterValue}`;
      const response = await axios.get(url);
      setMeals(response.data.meals || []);
    } catch (error) {
      console.error("Error filtering meals:", error);
    }
  };

  return (
    <div>
      <button onClick={filterMeals}>Filter by {filterType}: {filterValue}</button>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>{meal.strMeal}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterMeals;

