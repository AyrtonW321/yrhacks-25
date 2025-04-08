import React, { useEffect, useState } from "react";
import "./Recipes.css";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('aiRecipe');
    if (stored) {
      const parsed = JSON.parse(stored);
      setRecipes(parsed); // expects an array from the AI
    }
  }, []);

  if (!recipes.length) return <p>No recipes available. Use AI to generate one!</p>;

  return (
    <div className="recipe-page">
      <section className="most-recent">
        <h2>Most Recent Recipe</h2>
        <div className="recent-recipe-box">
          <div className="left-column">
            <div className="image-box">
              <img src={recipes[0].imageURL} alt={recipes[0].recipeName} />
            </div>
            <div className="ingredients-box">
              <h4>Ingredients</h4>
              <ul>
                {recipes[0].itemsNeeded.map((item, index) => (
                  <li key={index}>{item.quantity} of {item.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-column">
            <div className="recipe-name-container">
              {recipes[0].recipeName}
            </div>
            <div className="instructions-box">
              <h4>Instructions</h4>
              <ol>
                {recipes[0].instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <hr />

      <section className="past-recipes">
        <h2>Past Recipes</h2>
        <div className="past-recipes-grid">
          {recipes.map((recipe, index) => (
            <div className="recipe-card" key={index}>
              <div className="recipe-image">
                <img src={recipe.imageURL} alt={recipe.recipeName} />
              </div>
              <div className="recipe-name">{recipe.recipeName}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecipePage;