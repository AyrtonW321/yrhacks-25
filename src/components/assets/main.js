import * as aiFunctions from './api.js';

let data = [];

let made = [];

// depending on what is in the fridge make sure we have enough ingredients
// create an argument for the ai
function buildPrompt(ingredients, nutrients, dietary, time){
    let arg = `Ingredients I have ${JSON.stringify(ingredients)}, you do not have to use all of them 
    but you cannot use more than what we have,
        Nutrients I want are a lot of ${JSON.stringify(nutrients)},
        The dietary restrictions I have are ${JSON.stringify(dietary)}, these must be followed,
        I want to create the food in ${time} minutes, this is not concrete but should be around the time,
        We already have the recipes ${JSON.stringify(made)}, don't make these recipes again
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

console.log(foodType("egg", ["vegetables","meat" ,"fruit"]))