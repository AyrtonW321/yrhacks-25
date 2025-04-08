import * as aiFunctions from './googleApi.js';
import * as a from './algorithms.js';

let recipeData = [];
let recipeNames = [];
let madeRecipes = []; // Added to replace the undefined 'made' variable

const recipeDataURL = '/datasets/food-ingredients-and-recipe-dataset-with-images/mapping.json';

// fetch json data
async function fetchRecipeData() {
  try {
    const response = await fetch(recipeDataURL);
    
    // First check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    recipeData = await response.json();
    
    // Now populate the recipeNames array
    if (recipeData && Array.isArray(recipeData)) {
      recipeNames = recipeData.map(item => item.Title);
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    // You might want to set default data here if fetch fails
    recipeData = [];
    recipeNames = [];
  }
}

export default async function buildPrompt(ingredients, nutrients, dietary, time) {
  let arg = `These are all the recipes ${recipeData}, choose a recipe between them,
    Ingredients I have ${JSON.stringify(ingredients)}, you do not have to use all of them 
    but you cannot use more than what we have,
        Nutrients I want are a lot of ${JSON.stringify(nutrients)},
        The dietary restrictions I have are ${JSON.stringify(dietary)}, these must be followed,
        I want to create the food in ${time} minutes, this is not concrete but should be around the time,
    `;
    let newRecipe = aiFunctions.createRecipe(arg);
    data.push(newRecipe);
    made.push(newRecipe['recipeName'])
    return newRecipe;
}

console.log(buildPrompt(['egg', 'vegetable', 'rice', 'sugar'], [], [], 'any'))

// returns the category the food is in, based on given categories
// first parameter the food
// second parameter array of categories
export async function foodType(food, categories) {
  let arg = `These are all the catgeories I have: ${JSON.stringify(categories)}, these are set in place make sure you return one of these,
    I have this food: ${food} what category does it fit in?
    Return "other" if there really is not an option`
    ;
  let category = await aiFunctions.categorize(arg);
  // returns other if there really is not an option
  return category
}

console.log(foodType("egg", ["vegetables", "meat", "fruit"]))
function searchRecipe(input) {
  let sorter = new a.MergeSortLL(recipeNames);
  let sortedRecipeIndexs = sorter.sort(a.compareAlphaAscending)
  let sortedRecipes = a.indexToData(sortedRecipeIndexs, recipeNames);
  let sortedData = a.indexToData(sortedRecipeIndexs, recipeData);

  console.log(sortedRecipes)

  let searchedIndexs = a.binarySearch(input, sortedRecipes, a.compareAlphaDescending);
  let searchedData = a.indexToData(searchedIndexs, sortedData);
  return searchedData;
}