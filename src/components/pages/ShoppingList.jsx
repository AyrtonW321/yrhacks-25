import react from "react";
import { useEffect, useState } from "react";
import "./ShoppingList.css";

const ShoppingList = () => {
  const [ingredientInput, setIngredientInput] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [activeList, setActiveList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        header.classList.toggle("sticky", window.scrollY > 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatIngredient = (rawInput) => {
    let quantity = 1;
    let name = rawInput.trim().toLowerCase();

    const quantityMatch =
      name.match(/(\d+)\s*x*\s*([a-z\s]+)/i) ||
      name.match(/([a-z\s]+)\s*x*\s*(\d+)/i);

    if (quantityMatch) {
      if (!isNaN(quantityMatch[1])) {
        quantity = parseInt(quantityMatch[1]);
        name = quantityMatch[2];
      } else {
        quantity = parseInt(quantityMatch[2]);
        name = quantityMatch[1];
      }
    }

    name = name.trim().replace(/\s+/g, " ");
    name = name.charAt(0).toUpperCase() + name.slice(1);

    return { quantity, name };
  };

  const handleAddIngredient = () => {
    if (!ingredientInput.trim()) return;

    const { quantity, name } = formatIngredient(ingredientInput);
    const date = new Date().toLocaleDateString();
    const newItem = { quantity, name, category, date, id: Date.now() };

    setActiveList((prev) => [...prev, newItem]);
    setIngredientInput("");
  };

  const handleToggle = (item, fromActive) => {
    if (fromActive) {
      setActiveList((prev) => prev.filter((i) => i.id !== item.id));
      setCompletedList((prev) => [...prev, item]);
    } else {
      setCompletedList((prev) => prev.filter((i) => i.id !== item.id));
      setActiveList((prev) => [...prev, item]);
    }
  };

  return (
    <main className="shoppingListContainer">
      <h1>Shopping List</h1>
      <div className="list-actions">
        <div className="input-container">
          <input
            type="text"
            className="ingredient-input"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder="e.g. 2 Tomatoes"
          />
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Meat">Meat</option>
          <option value="Seafood">Seafood</option>
          <option value="Dairy">Dairy</option>
          <option value="Grains">Grains</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={handleAddIngredient}>Add Ingredient</button>
      </div>

      <div className="lists-container">
        <div className="list-section">
          <h2>Active Ingredients</h2>
          <ul className="ingredient-list">
            {activeList.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  onChange={() => handleToggle(item, true)}
                />
                <span>
                  {item.quantity}x {item.name} | {item.category} | {item.date}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="list-section">
          <h2>Completed Ingredients</h2>
          <ul className="ingredient-list">
            {completedList.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked
                  onChange={() => handleToggle(item, false)}
                />
                <span>
                  {item.quantity}x {item.name} | {item.category} | {item.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ShoppingList;
