/* Decoration.js */

import React, { useEffect } from 'react';
import './Decoration.css';
import limageUrl from './Images/limage2.png';
import rightImageUrl from './Images/rimage.png';
import lowerleft from './Images/lowerleft.png';
import lowerright from './Images/lowerright.png';
import plant from './Images/plant.png';
import Homesal from './homesal'
import Navbar from './Navbar';
import LowerImage from './LowerImage';

const Decoration = ({ onPredictClick}) => {


  return (
    <>
    <Navbar/>
    <div className="container">
      
      <img src={limageUrl} alt="Left" className="left-image" />

     
      <div className="main-content">
        <Homesal/>
      </div>

      
      <img src={plant} alt="plant" className="plant" />

      <LowerImage />
    </div>
    </>
  );
};

export default Decoration;
