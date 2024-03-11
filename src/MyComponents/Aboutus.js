import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import aboutus from './Images/aboutus (6).png';
import aboutusOther from './Images/aboutus (2).png';
import Speech from './speech';
const AboutUs = ({ language }) => {
    console.log("Hie")
  // Determine which image to display based on the selected language
  const imageUrl = language === 'en' ? aboutus : aboutusOther;

  return (
    <div>
      
      <Navbar />
      <Speech  />
      <img src={imageUrl} alt="About Us" />
      
    </div>
  );
};

export default AboutUs;
