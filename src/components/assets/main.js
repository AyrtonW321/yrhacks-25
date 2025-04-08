import * as aiFunctions from './googleApi.js';

let recipeData = 'public/datasets/food-ingredients-and-recipe-dataset-with-images/mapping.json';

const recipeDataURL = 'public/datasets/food-ingredients-and-recipe-dataset-with-images/mapping.json'

// fetch json data
fetch(recipeDataURL)  // Replace with your URL
  .then(response => {
    // Check if the response is okay (status 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  // Parse the JSON from the response
  })
  .then(recipeData => {
    console.log(recipeData);  // Handle the JSON data (an object or array)
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

// depending on what is in the fridge make sure we have enough ingredients
// create an argument for the ai
function buildPrompt(ingredients, nutrients, dietary, time){
    let arg = `These are all the recipes ${recipeData}, choose a recipe between them,
    Ingredients I have ${JSON.stringify(ingredients)}, you do not have to use all of them 
    but you cannot use more than what we have,
        Nutrients I want are a lot of ${JSON.stringify(nutrients)},
        The dietary restrictions I have are ${JSON.stringify(dietary)}, these must be followed,
        I want to create the food in ${time} minutes, this is not concrete but should be around the time,
    `;
    let newRecipe = aiFunctions.createRecipe(arg);
    data.push(newRecipe);
    made.push(newRecipe[recipeName])
}

// returns the category the food is in, based on given categories
// first parameter the food
// second parameter array of categories
function foodType(food, categories){
    let arg = `These are all the catgeories I have: ${JSON.stringify(categories)}, these are set in place make sure you return one of these,
    I have this food: ${food} what category does it fit in?
    Return "other" if there really is not an option`
    ;
    let category = aiFunctions.categorize(arg);
    // returns other if there really is not an option
    return category
}

function findImage(path){
    let name = aiFunctions.readImage(path)
    console.log(name);
}
