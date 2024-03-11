import React, { useState } from 'react';
import './Navbar.css';
import imageUrl from './Images/image19.png';
import ivector from './Images/Vector.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AboutUs from './Aboutus'
const Navbar = () => {
  const { t, i18n } = useTranslation();


  const [languageClicked, setLanguageClicked] = useState(false);
  const [vectorClicked, setVectorClicked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageClick = () => {
    setLanguageClicked(!languageClicked);
    setVectorClicked(false);
  };

  const handleVectorClick = () => {
    setVectorClicked(!vectorClicked);
    setLanguageClicked(false);
  };

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    setLanguageClicked(false);
    changeLanguage(languageCode); // Call changeLanguage function
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'pun', name: 'ਪੰਜਾਬੀ' },
    { code: 'bhoj', name: 'भोजपूरी' },
    { code: 'bundeli', name: 'बुन्देली ' },
    { code: 'kan', name: 'Kannad' },
    { code: 'ben', name: 'Bengali' },
    { code: 'dogr', name: 'Dogri' },
    // Add more languages as needed
  ]; // Language options

  return (
    <>
      <div className="home-parent">
        <Link to='/' className="home"><div >{t('home')}</div></Link>
        <Link to ='/aboutus' component={<AboutUs />}><div className="about">{t('about')}</div></Link>
        <Link to='/' className="saathihome"><div className="saathi">{t('saathi')}</div></Link>
        <Link to='/'><div className="logo">
          <img src={imageUrl} alt="Logo" />
        </div>
        </Link>
      </div>
      <div>
        <div className="language-parent">
          <div className="language" onClick={handleLanguageClick}>
            {languageOptions.find((option) => option.code === selectedLanguage)?.name}
          </div>
          {languageClicked && (
            <div className="language-dropdown">
              {languageOptions.map((option) => (
                <div
                  key={option.code}
                  onClick={() => handleLanguageSelect(option.code)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
          <div className="vectorclass" onClick={handleVectorClick}>
            <img src={ivector} alt="Vector" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
