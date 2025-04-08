import { useState } from 'react';
import './App.css';
import Fridge from './Fridge';

function App() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const addFood = () => {
    const foodName = searchInput.trim();
    if (!foodName) return;

    const category = 'Fruit'; // 👈 hardcoded category

    setFoodItems([...foodItems, { name: foodName, category }]);
    setSearchInput('');
  };

  return (
    <div className="fridgeContainer">
      <h1>My Fridge</h1>

      <div className="inputBar">
        <input 
          className="foodInput"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addFood()}
          placeholder="Enter food name..."
        />
        <button onClick={addFood} className="addButton">Add</button>
      </div>

      <Fridge foodItems={foodItems} />
    </div>
  );
}

export default App;
