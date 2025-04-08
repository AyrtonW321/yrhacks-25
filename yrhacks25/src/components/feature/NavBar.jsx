import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header id="header" className={isScrolled ? 'sticky' : ''}>
            <div className="navContainer">
                <Link to="/" className="logoContainer">
                    <img src="/logo.png" alt="Logo" className="logo" />
                    <span className="siteName">FridgeMate</span>
                </Link>
                <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/fridge">My Fridge</Link>
                    <Link to="/recipes">My Recipes</Link>
                    <Link to="/shoppingList">My Shopping List</Link>
                </nav>
            </div>
        </header>


    );

}

export default NavBar;