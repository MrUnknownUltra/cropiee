// soil.js
import React from 'react';
import Upload from './Upload';
import imageUrl from './Images/hydologo.png'
import uploadlogo from "./Images/uploadlogo.png"
import hydrologopredict from './Images/hydropredictlogo.png'
const Soil = () => {
  return (
    <div>
      <Upload 
      imageUrl={imageUrl}
      textHeading="Soil Nutrient Analysis"
      onPredictClick={() => console.log('Predict clicked')}
      uploadlogo={uploadlogo}
      hydrologopredict={hydrologopredict}/>
      {/* Content specific to the soil component */}
    </div>
  );
};

export default Soil;