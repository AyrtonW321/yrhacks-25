import react from 'react';
import './ShoppingList.css';

const ShoppingList = () => {

    return (
        <main class="shoppingListContainer">
            <h1>Shopping List</h1>
            <div class="list-actions">
                <input type="text" id="ingredientInput" placeholder="e.g. 2 Tomatoes" />
                <select id="categorySelect">
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Meat">Meat</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Grains">Grains</option>
                    <option value="Other">Other</option>
                </select>
                <button onclick="addIngredient()">Add Ingredient</button>
            </div>

            <div class="list-section">
                <h2>Active Ingredients</h2>
                <ul id="activeList" class="ingredient-list"></ul>
            </div>

            <div class="list-section">
                <h2>Completed Ingredients</h2>
                <ul id="completedList" class="ingredient-list"></ul>
            </div>
        </main>
    );
}

export default ShoppingList;