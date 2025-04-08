//npm install @google/genai
import { GoogleGenAI } from "@google/genai";

// api keys
const ai = new GoogleGenAI({ apiKey: "AIzaSyA_MpOm8aTNoNi5aYeGsEj4TIEnFZVM2xU" });

export async function createRecipe(arg) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: arg,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        recipeName: {
                            type: 'string',
                            description: 'Name of the recipe',
                            nullable: false,
                        },
                        description:{
                            type: 'string',
                            description: 'What it is',
                            nullable: false,
                        },
                        itemsNeeded: {
                            type: 'array',
                            description: 'List of ingredients needed for the recipe',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string', description: 'Ingredient name' },
                                    quantity: { type: 'string', description: 'Quantity and units' },
                                },
                                required: ['name', 'quantity'],
                            },
                        },
                        instructions: {
                            type: 'array',
                            description: 'List of steps needed for recipe',
                            items: {
                                type: 'string',
                                description: 'Detailed instructions on recipe, make sure to include the items used and quantity',
                            },
                        },
                        nutrients: {
                            type: 'object',
                            description: 'Nutritional information of the recipe',
                            properties: {
                                calories: {
                                    type: 'number',
                                    description: 'Calories in the recipe',
                                    nullable: false,
                                },
                                protein: {
                                    type: 'string',
                                    description: 'Protein content',
                                    nullable: false,
                                },
                                fat: {
                                    type: 'string',
                                    description: 'Fat content',
                                    nullable: false,
                                },
                            },
                            required: ['calories', 'protein', 'fat'],
                        },
                        estimatedCookingTime:{
                            type: 'number',
                            description: 'Estimated time it takes to create in minutes',
                        }
                    },
                    required: ['recipeName', 'nutrients', 'instructions', 'description', 'itemsNeeded'],
                },
            },
        },
    });
    let recipe = JSON.parse(response.text); // add to data
    console.log(recipe); // log 
    return recipe;
}

export async function categorize(arg) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: arg, 
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: 'string',
                description: 'The category the food is in',
            }
        },
    })
    let category = JSON.parse(response.text);
    console.log(category); // log
    return category; 
}