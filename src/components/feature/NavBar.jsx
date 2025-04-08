import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ onSettingsClick }) => {
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
                    <Link to="/Fridge">My Fridge</Link>
                    <Link to="/Recipes">My Recipes</Link>
                    <Link to="/ShoppingList">My Shopping List</Link>
                </nav>
                <button onClick={onSettingsClick} className="settingsBtn">
                    <FontAwesomeIcon icon={faGear} />
                </button>
            </div>
        </header>
    );
};

export default NavBar;