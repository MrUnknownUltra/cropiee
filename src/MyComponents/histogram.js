// SARChart.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import data from './Data/water_quality_data.json'; //  directly importing the JSON file
import './histogram.css';

const SARChart = () => {
  const [parsedData, setParsedData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showTable, setShowTable] = useState(false); 

  useEffect(() => {
   
    setParsedData(data);
  }, []);

  console.log(parsedData);

  if (!parsedData || parsedData.length === 0 || !parsedData[0]['id']) {
    return <div>Error: Invalid data format</div>;
  }

  const calculatedSARValues = parsedData.map((sample) => {
    const Na = parseFloat(sample['Na']);
    const Ca = parseFloat(sample['Ca']);
    const Mg = parseFloat(sample['Mg']);

    if (isNaN(Na) || isNaN(Ca) || isNaN(Mg) || Ca + Mg === 0) {
      return null;
    }

    return Na / Math.sqrt(Ca + Mg);
  });

  if (calculatedSARValues.some((value) => value === null)) {
    return <div>Error: Invalid data for SAR calculation</div>;
  }

  const xValues = parsedData.map((sample) => sample['id']);
  const yValues = calculatedSARValues;


  const defaultBarColor = 'rgb(25, 52, 59)';
  const hoverBarColor = 'rgb(143, 182, 112)'; 

  
  const interpretSAR = (sarValue) => {
    if (sarValue >= 1 && sarValue <= 9) {
      return 'Low - Suitable for most crops';
    } else if (sarValue >= 10 && sarValue <= 17) {
      return 'Medium - Caution, may affect sodium-sensitive crops';
    } else if (sarValue >= 18 && sarValue <= 25) {
      return 'High - Generally unsuitable for continuous use';
    } else if (sarValue >= 26 && sarValue <= 225) {
      return 'Very High - Generally unsuitable for use';
    } else if (sarValue >= 226) {
      return 'Very High - Use on sodium-sensitive crops must be cautioned';
    } else {
      return 'Invalid SAR value';
    };
  };

  const interpretations = calculatedSARValues.map((value) => interpretSAR(value));

  const plotData = [
    {
      x: xValues,
      y: yValues,
      type: 'bar',
      marker: { color: xValues.map((_, index) => (index === hoveredIndex ? hoverBarColor : defaultBarColor)) },
      hoverinfo: 'yValues', // Disable hover info on bars
    },
  ];

  const layout = {
    title: {
      text: 'SAR Values for Each Sample',
      font: {
        size: 20,
        color: 'rgb(0, 0, 0)',
        family: 'Arial',
        weight: 'bold',
      },
      yaxis: { title: 'SAR Value' },
    },
    paper_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent background
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
    },
    plot_bgcolor: 'rgba(255, 255, 255, 0.9)',
    showlegend: false,
    border: {
      color: 'rgb(25, 52, 59)',
      width: 2,
    },
    boxshadow: '0 4px 8px rgba(0, 0, 0, 0.25)', // Add box shadow
  };
  
  const tableData = xValues.map((sampleId, index) => ({
    Sample: sampleId,
    SAR: yValues[index],
    Interpretation: interpretations[index],
  }));

  return (
    <div className="sar-chart-container">
      <div className="chart-container">
        <Plot
          data={plotData}
          layout={layout}
          config={{ displayModeBar: false }}
          onHover={(event) => {
            const pointNumber = event.points[0].pointNumber;
            setHoveredIndex(pointNumber);
          }}
          onUnhover={() => {
            setHoveredIndex(null);
          }}
          style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)' }}
        />
      </div>
      <button className="interpretation" onClick={() => setShowTable(!showTable)}>
        <p className='interpret'>Interpretation</p>
        </button>

      {showTable && (
        <table className='table'>
          <thead>
            <tr>
              <th>Sample</th>
              <th>SAR</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.Sample}</td>
                <td>{row.SAR}</td>
                <td>{row.Interpretation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SARChart;