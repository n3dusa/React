import React from 'react';
import RandomMeal from './components/RandomMeal';
import SearchMeal from './components/SearchMeal';
import FilterMeals from './components/FilterMeals';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Meal Recipe App</h1>
      <RandomMeal />
      <SearchMeal />
      <FilterMeals filterType="i" filterValue="chicken" />
    </div>
  );
}

export default App;

