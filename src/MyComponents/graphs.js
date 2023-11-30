// SARChart.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './histogram.css';

const SARChart = () => {
  const [parsedData, setParsedData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const data = [
      {
        "ph": "7.249080237694725",
        "Hardness": "4.116898859160489",
        "Solids": "305.92644736118973",
        "Chloramines": "2.4301794076057535",
        "Sulfate": "30.509558711194707",
        "Conductivity": "775.6677022116469",
        "Organic_carbon": "0.777354579378964",
        "Trihalomethanes": "0.061779581543732594",
        "Turbidity": "0.8631034258755935",
        "Na": "11.959424593830171",
        "Ca": "3.142918568673425",
        "Mg": "14.4875726456884",
        "HCO3": "161.4880310328125",
        "CO3": "41.7411003148779",
        "id": 1
      },
    ];

    setParsedData(data);
  }, []);

  if (!parsedData || parsedData.length === 0 || !parsedData[0]['id']) {
    return <div>Error: Invalid data format</div>;
  }

  const labels = Object.keys(parsedData[0]).filter(key => key !== 'id');
  
  // Calculate mean, min, and max for each parameter
  const statistics = labels.reduce((acc, label) => {
    const values = parsedData.map(data => parseFloat(data[label])).filter(value => !isNaN(value));

    if (values.length > 0) {
      acc[label] = {
        mean: values.reduce((sum, value) => sum + value, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
      };
    }

    return acc;
  }, {});

  const meanValues = labels.map(label => statistics[label]?.mean || 0);
  const defaultBarColor = 'rgb(25, 52, 59)';
  const hoverBarColor = 'rgb(143, 182, 112)';
  const pieData = [
    {
      labels,
      values: meanValues,
      type: 'pie',
      hoverinfo: 'label+percent+name',
      textinfo: 'none',
      textposition: 'inside',
      marker: { colors: labels.map((_, index) => (index === hoveredIndex ?  hoverBarColor: defaultBarColor)) },
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

export default SARChart;
