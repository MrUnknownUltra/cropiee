// SARChart.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './histogram.css';

const Pie = ({ values }) => {

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [meanValues, setMeanValues] = useState(null);
  useEffect(() => {
    // Calculate mean values
    const meanValues = calculateMean(values);
    setMeanValues(meanValues);
  }, [values]);

  const calculateMean = (data) => {
    if (!data || data.length === 0) return null;

    const selectedKeys = ['Solids', 'Chloramines', 'Sulfate', 'Organic_carbon', 'Trihalomethanes', 'Sodium', 'Magnesium', 'Calcium'];

    const filteredData = data.map(obj => {
      const filteredObj = {};
      selectedKeys.forEach(key => {
        filteredObj[key] = obj[key];
      });
      return filteredObj;
    });

    const meanValues = {};
    selectedKeys.forEach(key => {
      const total = filteredData.reduce((acc, obj) => acc + obj[key], 0);
      meanValues[key] = total / filteredData.length;
    });
    
    return meanValues;
  };

  if (!meanValues) {
    return <div>Loading...</div>;
  }

  const labels = Object.keys(meanValues);
  const valuesArray = Object.values(meanValues); // Convert object values to array

  const defaultBarColor = 'rgb(25, 52, 59)';
  const hoverBarColor = 'rgb(143, 182, 112)';
  const pieData = [
    {
      labels: labels,
      values: valuesArray, // Use the array of values
      type: 'pie',
      hoverinfo: 'label+percent+name',
      textinfo: 'none',
      textposition: 'inside',
      marker: { colors: labels.map((_, index) => (index === hoveredIndex ? hoverBarColor : defaultBarColor)) },
    },
  ];

  const layout = {
    title: {
      text: 'Mean Water Quality Distribution',
      font: {
        size: 20,
        color: 'rgb(0, 0, 0)',
        family: 'Arial',
        weight: 'bold',
      },
      yaxis: { title: 'SAR Value' },
    },
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
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
    showlegend: true,
    border: {
      color: 'rgb(25, 52, 59)',
      width: 2,
    },
  };

  return (
    <div className="sar-chart-container">
      <div className="chart-container">
        <Plot
          data={pieData}
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
    </div>
  );
};

export default Pie;
