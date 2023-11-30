import React, { useState, useEffect } from 'react';
import data from './Data/water_quality_data.json';

const WaterPotabilityResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
   
    const properties = Object.keys(data[0]).filter(key => key !== 'id');
    const calculatedResults = properties.map(property => ({
      property,
      min: Math.min(...data.map(entry => parseFloat(entry[property]))),
      max: Math.max(...data.map(entry => parseFloat(entry[property]))),
      mean: data.reduce((sum, entry) => sum + parseFloat(entry[property]), 0) / data.length,
      stdDev: calculateStandardDeviation(data.map(entry => parseFloat(entry[property])))
    }));


    setResults(calculatedResults);
  }, []); 

  useEffect(() => {
    console.log(results);
  }, [results]); 

  
  const calculateStandardDeviation = values => {
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
    const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / values.length;
    return Math.sqrt(variance);
  };

  return (
    <div>
      <h2>Water Potability Results</h2>
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Min</th>
            <th>Max</th>
            <th>Mean</th>
            <th>Std Dev</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.property}>
              <td>{result.property}</td>
              <td>{result.min.toFixed(2)}</td>
              <td>{result.max.toFixed(2)}</td>
              <td>{result.mean.toFixed(2)}</td>
              <td>{result.stdDev.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WaterPotabilityResults;
