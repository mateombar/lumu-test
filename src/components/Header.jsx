import React from 'react';
import chile from '../assets/img/chile.png';
import './styles/Header.css';
export const Header = () => (
    <header className="header">
        <div className="header__container">
            <div className="header__title">
                <h1>Let's get spicy</h1>
                <img src={chile} alt="Logo" />
            </div>
            <p>Bacon Ipsum Generator</p>
        </div>
    </header>
)