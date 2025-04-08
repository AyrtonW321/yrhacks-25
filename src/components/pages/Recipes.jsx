import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Recipes.css";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Check for recipe passed via navigation state
    if (location.state?.aiRecipe) {
      setRecipes([location.state.aiRecipe]);
      return;
    }
    
    // Fallback to localStorage
    const stored = localStorage.getItem('aiRecipe');
    if (stored) {
      try {
        setRecipes([JSON.parse(stored)]);
      } catch (e) {
        console.error("Error parsing stored recipe", e);
      }
    }
  }, [location.state]);

  if (!recipes.length) return <p>No recipes available. Use AI to generate one!</p>;

  // Ensure we have the expected structure
  const currentRecipe = recipes[0] || {};
  const itemsNeeded = currentRecipe.itemsNeeded || [];
  const instructions = currentRecipe.instructions || [];

  return (
    <div className="recipe-page">
      <section className="most-recent">
        <h2>Most Recent Recipe</h2>
        <div className="recent-recipe-box">
          <div className="left-column">
            <div className="image-box">
              {currentRecipe.imageURL && (
                <img src={currentRecipe.imageURL} alt={currentRecipe.recipeName} />
              )}
            </div>
            <div className="ingredients-box">
              <h4>Ingredients</h4>
              <ul>
                {itemsNeeded.map((item, index) => (
                  <li key={index}>
                    {item.quantity} {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-column">
            <div className="recipe-name-container">
              {currentRecipe.recipeName}
            </div>
            <div className="instructions-box">
              <h4>Instructions</h4>
              <ol>
                {instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipePage;