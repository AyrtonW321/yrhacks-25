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

export async function readImage(imagePath) {
    // Define the prompt text
    const arg = `Tell me what the name of the food shown in this image is,
    return a food name with the 'foodName' property`;

    try {
        // Fetch the image and convert it into a Blob
        const response = await fetch(imagePath);
        const imageBlob = await response.blob();

        // Prepare FileReader
        const reader = new FileReader();

        // Return a Promise to handle the asynchronous FileReader
        return new Promise((resolve, reject) => {
            reader.onloadend = async () => {
                try {
                    const imageData = reader.result.split(',')[1]; // Get base64 data

                    // Make the API call
                    const apiResponse = await ai.models.generateContent({
                        model: "gemini-1.5-pro",
                        contents: [
                            { text: arg },
                            { inlineData: { mimeType: "image/jpg", data: imageData } }
                        ]
                    });

                    // Clean the response text to remove markdown formatting
                    const cleanText = apiResponse.text.replace(/```json|```/g, '').trim();

                    // Parse the JSON response
                    const parsedResponse = JSON.parse(cleanText);
                    console.log(parsedResponse);
                    parsedResponse['imagePath'] = imagePath;
                    resolve(parsedResponse);
                } catch (error) {
                    console.error("Error during API call or parsing response:", error);
                    reject(error);
                }
            };

            reader.onerror = (error) => {
                console.error("Error reading image file:", error);
                reject(error);
            };

            // Trigger the FileReader
            reader.readAsDataURL(imageBlob);
        });
    } catch (error) {
        console.error("Error fetching the image:", error);
        throw error;
    }
}
