import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './soilhistogram.css';
import { useTranslation } from 'react-i18next';

const AgriculturalParametersChart = ({ values }) => {
  const { t } = useTranslation();
  const cropData = {
    rice: { standard_values: [40, 25, 20, 28, 65, 7.0, 60] },
    maize: { standard_values: [38, 24, 22, 30, 60, 6.8, 55] },
    chickpea: { standard_values: [30, 20, 18, 25, 70, 7.5, 45] },
    millets: { standard_values: [35, 22, 18, 27, 55, 6.5, 50] },
    wheat: { standard_values: [42, 26, 24, 26, 60, 6.9, 55] },
    barley: { standard_values: [38, 24, 20, 25, 65, 6.8, 50] },
    lentils: { standard_values: [32, 18, 20, 28, 60, 7.2, 45] },
    oats: { standard_values: [40, 25, 22, 28, 55, 6.7, 60] },
    sorghum: { standard_values: [34, 20, 18, 30, 65, 6.5, 55] },
    rye: { standard_values: [36, 22, 20, 25, 60, 6.8, 50] },
    kidneybeans: { standard_values: [32, 22, 20, 28, 60, 7.0, 45] },
    blackgram: { standard_values: [30, 20, 18, 30, 65, 7.2, 40] },
    pomegranate: { standard_values: [20, 10, 10, 30, 50, 6.0, 40] },
    banana: { standard_values: [25, 15, 10, 28, 65, 5.5, 45] },
    mango: { standard_values: [28, 18, 15, 32, 60, 6.0, 60] },
    grapes: { standard_values: [22, 18, 12, 28, 60, 6.0, 50] },
    watermelon: { standard_values: [18, 10, 8, 32, 70, 6.5, 70] },
    muskmelon: { standard_values: [20, 12, 10, 30, 65, 6.5, 60] },
    apple: { standard_values: [28, 18, 15, 25, 55, 6.0, 40] },
    orange: { standard_values: [25, 15, 12, 28, 60, 6.5, 50] },
    papaya: { standard_values: [22, 12, 10, 30, 65, 6.0, 60] },
    coconut: { standard_values: [10, 5, 5, 30, 70, 5.5, 80] },
    cotton: { standard_values: [22, 14, 12, 28, 60, 6.5, 50] },
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
      y: Object.values(values),
      type: 'bar',
      marker: {
        color: categories.map((_, index) => (index === hoveredIndex ? hoverBarColor : defaultBarColor)),
      },
      name: t('actual'),
    },
    {
      x: categories,
      y: selectedCropData.standard_values,
      type: 'bar',
      name: t('standard'),
    },
  ];

  // Layout configuration
  const layout = {
    barmode: 'group',
    xaxis: {
      title: t('soilParameter'), // Translated tag
    },
    yaxis: {
      title: t('parameterValues'), // Translated tag
    },
    title: t('comparisonTitle', { selectedCrop: t(selectedCrop) }), // Translated tag with dynamic variable
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

  // Handle hover event
  const handleHover = (event) => {
    const pointNumber = event.points[0].pointNumber;
    setHoveredIndex(pointNumber);
  };

  // Handle unhover event
  const handleUnhover = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="hchart-container">
      <div className="dropdown-container">
        <label htmlFor="cropDropdown">{t('selectCrop')} </label>
        <select id="cropDropdown" value={selectedCrop} onChange={handleCropChange}>
          {Object.keys(cropData).map((crop) => (
            <option key={crop} value={crop}>
              {t(crop)}
            </option>
          ))}
        </select>
      </div>
      <div className="plot-container">
        <Plot
          data={data}
          layout={layout}
          config={{ displayModeBar: false }}
          style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)' }}
          onHover={handleHover}
          onUnhover={handleUnhover}
        />
      </div>
    </div>
  );
};

export default AgriculturalParametersChart;
