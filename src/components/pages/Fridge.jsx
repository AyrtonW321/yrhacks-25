import Food from '../feature/Food';
import Category from '../feature/Category';
import { useState } from 'react'
import { foodType } from '../assets/main';
import './Fridge.css';

function Fridge() {
  // State to hold the list of food items added by the user
  const [foodItems, setFoodItems] = useState([]);
  // State to keep track of the user's input in the search bar
  const [searchInput, setSearchInput] = useState('');

  const categories = ["Fruits", "Vegetables", "Meat", "Dairy", "Seafood", "Grains", "Legumes", "Beverages", "Baking", "Condiments", "Herbs & Spices", "Oils & Fats"]


  // Function to add a new food item to the fridge
  const addFood = async () => {
    const foodName = searchInput.trim();
    if (!foodName) return;

    const category = await foodType(foodName, categories);
    console.log(category)

    const newFood = {name: foodName, category, quantity} // create a food object

    setFoodItems([...foodItems, newFood]);
    setSearchInput('');
  }

  const fruitItems = foodItems.filter(item => item.category === 'Fruits')
  const vegItems = foodItems.filter(item => item.category === 'Vegetables')
  const meatItems = foodItems.filter(item => item.category === 'Meat')
  const dairyItems = foodItems.filter(item => item.category === 'Dairy')
  const seafoodItems = foodItems.filter(item => item.category === 'Seafood')
  const grainItems = foodItems.filter(item => item.category === 'Grains')
  const legumeItems = foodItems.filter(item => item.category === 'Legumes')
  const beverageItems = foodItems.filter(item => item.category === 'Beverages')
  const bakingItems = foodItems.filter(item => item.category === 'Baking')
  const condimentItems = foodItems.filter(item => item.category === 'Condiments')
  const herbItems = foodItems.filter(item => item.category === 'Herbs & Spices')
  const oilItems = foodItems.filter(item => item.category === 'Oils & Fats')

  return (
    <div className='fridgeContainer'>
      <h1>My Fridge</h1>
      <div className="inputBar">
        <input
          className="foodInput"
          type="text"
          placeholder="Enter food name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={addFood} className="addButton">Add Food</button>
      </div>

      <div className="fridgeGridContainer">
        <div className="categorySection">
          <Category name="Fruits">
            {fruitItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          <Category name="Vegetables">
            {vegItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          <Category name="Meat">
            {meatItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          <Category name="Dairy">
            {dairyItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          <Category name="Seafood">
            {seafoodItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          <Category name="Grains">
            {grainItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          <Category name="Legumes">
            {legumeItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          <Category name="Beverages">
            {beverageItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          <Category name="Baking">
            {bakingItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          <Category name="Condiments">
            {condimentItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          <Category name="Herbs & Spices">
            {herbItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          <Category name="Oils & Fats">
            {oilItems.map((item, index) => (
              <Food key={index} name={item.name} />
            ))}
          </Category>
          </div>
        </div>
      </div>
  );
}

export default Fridge;
