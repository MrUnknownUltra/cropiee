import '../App.css';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Decoration from './Decoration';
import Gauge from './gauge';
import WaterPotabilityResults from './statistics';
import AgriculturalParametersChart from './soilhistogram';
import soilimgsmall from './Images/soilimgsmall.png'
import soilicon from './Images/soilicon.png'

console.log(WaterPotabilityResults.mean)
function SoilPredict() {
  const [showPredictedData, setShowPredictedData] = useState(false);
  const waterQualityValue = 0.9;

  const handlePredictClick = () => {
    setShowPredictedData(true);
  };
  return (
    <div>
      <Navbar />
      <Decoration
      onPredictClick={handlePredictClick}
      imgSrc={soilimgsmall}
      featureText={'Soil Nutrient Analysis'}
      icon={soilicon} />
      <AgriculturalParametersChart/>
      {showPredictedData && (
        <>
          <Gauge value={waterQualityValue} 
          title={'Soil Quality Index'}
          />
        </>)}
        
    </div>
  );
}

export default SoilPredict;
