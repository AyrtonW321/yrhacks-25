import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import buildPrompt from '../assets/main.js';
import './mainPage.css';


const MainPage = () => {
    const [aiRecipe, setAiRecipe] = useState(null);
    const navigate = useNavigate();

    const handleGenerateAIRecipe = async () => {
        const ingredients = ['egg', 'rice']; // Replace with real fridge data
        const nutrients = [];
        const dietary = [];
        const time = '20';

        try {
            const result = await buildPrompt(ingredients, nutrients, dietary, time);
            localStorage.setItem('aiRecipe', JSON.stringify(result));
            setAiRecipe(result);
            navigate('/recipes'); // Redirect to the recipes page
        } catch (err) {
            console.error("AI generation failed", err);
        }
    };

    return (
        <div className='searchBarContainer'>
            <h1>Whatcha cooking up today?</h1>
            <div className='searchBar'>
                <input placeholder='Search for a recipe...' className='searchInput' type='text' autoComplete='off' />
                <button className="ai" title="Magic" onClick={handleGenerateAIRecipe}>
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                    Use AI
                </button>

                <button>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    Search
                </button>
            </div>
        </div>
    );
};

export default MainPage;
