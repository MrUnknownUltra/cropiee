// Navbar.js
import React, { useState } from 'react';
import './Navbar.css';
import imageUrl from './Images/image19.png';
import ivector from './Images/Vector.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [languageClicked, setLanguageClicked] = useState(false);
  const [vectorClicked, setVectorClicked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default language

  const handleLanguageClick = () => {
    setLanguageClicked(!languageClicked);
    setVectorClicked(false);
  };

  const handleVectorClick = () => {
    setVectorClicked(!vectorClicked);
    setLanguageClicked(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setLanguageClicked(false);

  };

  const languageOptions = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi'];

  return (
    <div className="home-parent">
      <Link to='/'className="home"><div >Home</div></Link>
      <div className="about">About</div>
      <div className="language-parent">
        <div className="language" onClick={handleLanguageClick}>
          {selectedLanguage}
        </div>
        {languageClicked && (
          <div className="language-dropdown">
            {languageOptions.map((language) => (
              <div key={language} onClick={() => handleLanguageSelect(language)}>
                {language}
              </div>
            ))}
          </div>
        )}
        <div className="vectorclass" onClick={handleVectorClick}>
          <img src={ivector} alt="Vector" />
        </div>
      </div>
      <div className="saathi">Saathi</div>
      <div className="logo">
        <img src={imageUrl} alt="Logo" />
      </div>
    </div>
  );
};

export default Navbar;
