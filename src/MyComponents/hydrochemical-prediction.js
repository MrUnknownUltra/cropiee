import '../App.css';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Decoration from './Decoration';
import Gauge from './gauge';
import Pie from './graphs';
import SARChart from './histogram';
import WaterPotabilityResults from './statistics';

import hydroimgsmall from './Images/hydrochem.png'
import hydroicon from './Images/hydroicon.png'

console.log(WaterPotabilityResults.mean)
function HydroPredict() {
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
      imgSrc={hydroimgsmall}
      featureText={'Hydrochemical Data Analysis'}
      icon={hydroicon} />
      {/* {showPredictedData && (
        <>
          <Gauge value={waterQualityValue} />
          <div style={{ display: 'flex' , justifyContent: 'center'}}>
          <Pie />
          <SARChart />
          </div>
      
        </>)} */}
    </div>
  );
}

export default HydroPredict;
