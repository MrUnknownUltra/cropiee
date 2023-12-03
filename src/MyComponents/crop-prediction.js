import '../App.css';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Decoration from './Decoration';
import Gauge from './gauge';
import Pie from './graphs';
import SARChart from './histogram';
import WaterPotabilityResults from './statistics';
import cropimgsmall from './Images/cropimgsmall.png'
import cropicon from './Images/cropicon.png'

console.log(WaterPotabilityResults.mean)
function CropPredict() {
  const [showPredictedData, setShowPredictedData] = useState(false);
  const waterQualityValue = 0.9;

  const handlePredictClick = () => {
    setShowPredictedData(true);
  };
  return (
    <div>
      <Navbar />
      <Decoration
      
      imgSrc={cropimgsmall}
      featureText={'Crop Disease & Pest Prediction'}
      icon={cropicon} />
      
    </div>
  );
}

export default CropPredict;
