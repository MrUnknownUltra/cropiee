import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './soilhistogram.css';

const AgriculturalParametersChart = () => {
  // Sample data for different crops (replace with your actual data)
  const cropData = {
    rice: { data_values: [30, 20, 15, 25, 60, 6.5, 50], standard_values: [40, 25, 20, 28, 65, 7.0, 60] },
    maize: { data_values: [30, 20, 15, 25, 60, 6.5, 50], standard_values: [38, 24, 22, 30, 60, 6.8, 55] },
    chickpea: { data_values: [30, 20, 15, 25, 60, 6.5, 50], standard_values: [30, 20, 18, 25, 70, 7.5, 45] },
  };

  const categories = ['N', 'P', 'K', 'Temperature', 'Humidity', 'pH', 'Rainfall'];
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Get data for the selected crop
  const selectedCropData = cropData[selectedCrop];
  const defaultBarColor = 'rgb(25, 52, 59)';
  const hoverBarColor = 'rgb(143, 182, 112)';

  // Create a DataFrame for the data
  const data = [
    {
      x: categories,
      y: selectedCropData.data_values,
      type: 'bar',
      marker: {
        color: categories.map((_, index) => (index === hoveredIndex ? hoverBarColor : defaultBarColor)),
      },
      name: 'Actual',
    },
    {
      x: categories,
      y: selectedCropData.standard_values,
      type: 'bar',
      name: 'Standard',
    },
  ];

  // Layout configuration
  const layout = {
    barmode: 'group',
    xaxis: {
      title: 'Soil Parameter',
    },
    yaxis: {
      title: 'Parameter Values',
    },
    title: `Comparison of Agricultural Parameters for ${selectedCrop}`,
    paper_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent background
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
  };

  // Handle dropdown change
  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
  };

  return (
    <div className="hchart-container">
      <div className="dropdown-container">
        <label htmlFor="cropDropdown">Select Crop: </label>
        <select id="cropDropdown" value={selectedCrop} onChange={handleCropChange}>
          <option value="rice">Rice</option>
          <option value="maize">Maize</option>
          <option value="chickpea">Chickpea</option>
        </select>
      </div>
      <div className="plot-container">
        <Plot
          data={data}
          layout={layout}
          config={{ displayModeBar: false }}
          style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)' }}
          onHover={(event) => {
            const pointNumber = event.points[0].pointNumber;
            setHoveredIndex(pointNumber);
          }}
          onUnhover={() => {
            setHoveredIndex(null);
          }}
        />
      </div>
    </div>
  );
};

export default AgriculturalParametersChart;
