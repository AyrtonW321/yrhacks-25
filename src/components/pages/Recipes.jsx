import React from "react";
import "./Recipes.css";

const RecipePage = () => {
  const recipes = [
    { name: "Pasta", image: "pasta.jpeg" },
    { name: "Pasta", image: "pasta.jpeg" },
    { name: "Pasta", image: "pasta.jpeg" },
  ];

  return (
    <div className="recipe-page">
      <section className="most-recent">
        <h2>Most Recent Recipe</h2>
        <div className="recent-recipe-box">
          <div className="left-column">
            <div className="image-box">
              <img src={recipes[0].image} alt={recipes[0].name}></img>
            </div>
            <div className="ingredients-box">INGREDIENTS OF RECIPE</div>
          </div>
          <div className="right-column">
            <div className="recipe-name-container">
              {recipes[0].name}
            </div>
            <div className="instructions-box">
              INSTRUCTIONS / PROCEDURE FOR RECIPE
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
                <img src={recipe.image} alt={recipe.name} />
              </div>
              <div className="recipe-name">{recipe.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecipePage;
