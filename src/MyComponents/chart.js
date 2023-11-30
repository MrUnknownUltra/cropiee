import React from 'react';
import SARChart from './graphs'; 
import HistogramChart from './histogram';

const ChartContainer = () => {
  return (
    <div style={{ display: 'flex' , justifyContent: 'center'}}>
      <SARChart />
      <HistogramChart />
    </div>
  );
};

export default ChartContainer;
