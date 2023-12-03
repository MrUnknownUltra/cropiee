import React, { useState } from 'react';
import './Upload.css';
import imageUrl from './Images/hydologo.png'
import uploadlogo from "./Images/uploadlogo.png"
import Gauge from './gauge';
import Pie from './graphs';
import Decoration from './Decoration';
import SARChart from './histogram';
import hydrologopredict from './Images/hydropredictlogo.png'
import SoilPredict from './soil-prediction';

import hydroimgsmall from './Images/hydrochem.png'
import hydroicon from './Images/hydroicon.png'

const Upload = ({onPredictClick, imgSrc,featureText,icon}) => {
  const [showPredictedData, setShowPredictedData] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const waterQualityValue = 0.9;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  // const onPredictClick = () => {
  //   // Handle the logic for predicting with the selected file
  //   if (selectedFile) {
  //     // Perform the prediction with the selected file
  //     console.log('Predicting with file:', selectedFile);
  //     setShowPredictedData(true);
  //   } else {
  //     console.log('No file selected for prediction');
  //   }
  // };

    return (
      <div className="image-component">
        
        <img src={imgSrc} alt="Image" className="logopredict" />
  
        <p className="text-heading">{featureText}</p>
        <div className='uploadclass' onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDrop={handleDrop}>
        <img src={uploadlogo} alt="Image" className="upload" />
       
        <p className="simple">Drag and Drop files to upload<br/><br/><strong>OR</strong></p>
    
        <div className="button-container">
        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
        <button className="browse" onClick={() => document.querySelector('input[type="file"]').click()}>
          Browse
        </button>
        {selectedFile && (
          <div className="selected-file" ><b>
            Selected File: {selectedFile.name}</b>
          </div>
        )}
      </div>
        </div>
        <div>
        <button className="predict-button" onClick={onPredictClick}>
          <img src={icon} alt="Image" />
          <p className='predicttext'>PREDICT</p>
        </button>
      </div>
      {showPredictedData && (
        <>
          <Gauge value={waterQualityValue} />
          <div style={{ display: 'flex' , justifyContent: 'center'}}>
          <Pie />
          <SARChart />
          </div>
        </>)}
      </div>
    );
  };
  
  export default Upload;