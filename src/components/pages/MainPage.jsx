import React from 'react';
import './mainPage.css';

const MainPage = () => {

    return (
        <>
            <div className='searchBarContainer'>
                <h1>Whatcha cooking up today?</h1>
                <div className='searchBar'>
                    <input placeholder='Search for a recipe...' className='searchInput' type='text' autoComplete='off'/>
                    <button>Search</button>
                </div>
                
            </div>

            <div className='mainPageContainer'>
                <div className='mainPageCard'>
                    <h2>{recipe}</h2>
                    <p>{recipeSnippet}</p>
                </div>
            </div>
        </>
        
    )
}

export default MainPage