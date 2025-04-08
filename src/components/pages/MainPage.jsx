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

            {/* TODO */}
            <div className='mainPageContainer'>
                <div className='mainPageCard'>
                    <img src="/placeholder-image.jpg" className='img' alt='Image of Food'/>
                    <h2>Pasta Primavera</h2>
                    <p>Fresh vegetables and pasta in a light cream sauce</p>
                </div>
                
                <div className='mainPageCard'>
                    <img src="/placeholder-image.jpg" className='img' alt='Image of Food'/>
                    <h2>Chicken Alfredo</h2>
                    <p>Creamy pasta with grilled chicken and parmesan</p>
                </div>
                
                <div className='mainPageCard'>
                    <img src="/placeholder-image.jpg" className='img' alt='Image of Food'/>
                    <h2>Vegetable Curry</h2>
                    <p>Spicy vegetable curry with coconut milk and rice</p>
                </div>
                
                <div className='mainPageCard'>
                    <img src="/placeholder-image.jpg" className='img' alt='Image of Food'/>
                    <h2>Beef Stir Fry</h2>
                    <p>Quick and easy beef stir fry with vegetables</p>
                </div>
            </div>
        </>
    );
}

export default MainPage;