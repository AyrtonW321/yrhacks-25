import * as aiFunctions from './googleApi.js';
import * as a from './algorithms.js';

let recipeData = [];
let recipeNames = [];
let madeRecipes = []; // For tracking generated recipes

const recipeDataURL = '/datasets/food-ingredients-and-recipe-dataset-with-images/mapping.json';

async function fetchRecipeData() {
  try {
    const response = await fetch(recipeDataURL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    recipeData = await response.json();
    if (recipeData && Array.isArray(recipeData)) {
      recipeNames = recipeData.map(item => item.Title);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    recipeData = [];
    recipeNames = [];
  }
}

fetchRecipeData();

export async function buildPrompt(text) {
  try {
    const arg = `Choose a recipe from ${JSON.stringify(recipeData)}, must be between these, and base it off of this text: ${text}`;
    const newRecipe = await aiFunctions.createRecipe(arg);
    madeRecipes.push(newRecipe.recipeName);
    return newRecipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
}

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