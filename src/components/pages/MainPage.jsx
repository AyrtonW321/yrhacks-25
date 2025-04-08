import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { buildPrompt } from '../assets/main.js';
import './mainPage.css';

const MainPage = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const handleGenerateAIRecipe = async () => {
        try {
            const result = await buildPrompt(searchInput);
            navigate('/recipes', { state: { aiRecipe: result } });
        } catch (err) {
            console.error("AI generation failed", err);
            alert("Failed to generate recipe. Please try again.");
        }
    };

    return (
        <div className='searchBarContainer'>
            <h1>Whatcha cooking up today?</h1>
            <div className='searchBar'>
                <input 
                    placeholder='Search for a recipe...' 
                    className='searchInput' 
                    type='text' 
                    autoComplete='off'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
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