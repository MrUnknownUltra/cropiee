import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Navbar from './MyComponents/Navbar';
import Decoration from './MyComponents/Decoration';
import Cholorpeth from './MyComponents/Cholorpeth';
import Gauge from './MyComponents/gauge';
import SARChart from './MyComponents/chart';
import HydrochemicalDataVisualization from './MyComponents/graphs';
import Stats from './MyComponents/statistics';
import AgriculturalParametersChart from './MyComponents/soilhistogram';
import Soil from './MyComponents/soil'
console.log(Stats.mean)
function App() {
  const [showPredictedData, setShowPredictedData] = useState(false);
  const waterQualityValue = 0.9;

  const handlePredictClick = () => {
    // Perform any necessary logic when the predict button is clicked
    // For example, fetch data, calculate predictions, etc.
    
    // Set the state to show the predicted data components
    setShowPredictedData(true);
  };
  return (
    <div>
      <Navbar />
     
      <Decoration onPredictClick={handlePredictClick} />
      <AgriculturalParametersChart/>
      {showPredictedData && (
        <>
          <Gauge value={waterQualityValue} />
          <SARChart />
          {/* Other components you want to show when the "PREDICT" button is clicked */}
        </>
      )}
    </div>
  );
}

export default App;
