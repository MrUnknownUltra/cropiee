import React from 'react';
import './Upload.css';
import imageUrl from './Images/hydologo.png'
import uploadlogo from "./Images/uploadlogo.png"
import hydrologopredict from './Images/hydropredictlogo.png'
const ImageComponent = ({ onPredictClick }) => {

    return (
      <div className="image-component">
        
        <img src={imageUrl} alt="Image" className="logopredict" />
  
        <p className="text-heading">Hydrochemical Data Analysis</p>
        <div className='uploadclass'>
        <img src={uploadlogo} alt="Image" className="upload" />
       
        <p className="simple">Drag and Drop files to upload<br/><br/><strong>OR</strong></p>
    
        <div className="button-container">
        <button className="browse">Browse</button>
        </div>
        </div>
        <div>
        <button className="predict-button" onClick={onPredictClick}>
          <img src={hydrologopredict} alt="Image" />
          <p className='predicttext'>PREDICT</p>
        </button>
      </div>
        
      </div>
    );
  };
  
  export default ImageComponent;