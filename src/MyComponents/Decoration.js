/* Decoration.js */

import React, { useEffect } from 'react';
import './Decoration.css';
import limageUrl from './Images/limage2.png';
import rightImageUrl from './Images/rimage.png';
import lowerleft from './Images/lowerleft.png';
import lowerright from './Images/lowerright.png';
import Upload from './Upload';

const Decoration = ({ onPredictClick}) => {
  useEffect(() => {
    const lowerImage = document.querySelector('.lower-image');
    const lowerRightImage = document.querySelector('.lower-right');

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY > 100) {
        lowerImage.style.opacity = '1';
        lowerRightImage.style.opacity = '1';
      } else {
        lowerImage.style.opacity = '0';
        lowerRightImage.style.opacity = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container">
      
      <img src={limageUrl} alt="Left" className="left-image" />

     
      <div className="main-content">
        <Upload 
        onPredictClick={onPredictClick} />
      </div>

      
      <img src={rightImageUrl} alt="Right" className="right-image" />
      
      
      <img src={lowerleft} alt="Lower Left" className="lower-image" />
      
      
      <img src={lowerright} alt="Lower Right" className="lower-right" />
    </div>
  );
};

export default Decoration;
