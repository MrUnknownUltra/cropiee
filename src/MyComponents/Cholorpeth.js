import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import geojson from './Data/states_india.geojson'
import data from './Data/india_census.csv'
const ChoroplethMap = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    // Load GeoJSON data
    fetch(geojson)
      .then((response) => response.json())
      .then((data) => {
        // Map state names to state IDs in GeoJSON
        data.features.forEach((feature) => {
          feature.id = feature.properties.state_code;
        });
        setGeojsonData(data);
      })
      .catch((error) => console.error('Error loading GeoJSON:', error));

    // Load CSV data
    Papa.parse(data, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        // Extract density and apply logarithmic scaling
        results.data.forEach((item) => {
          item['Density'] = parseInt(item['Density[a]'].split("/")[0].replace(",", ""), 10);
          item['DensityScale'] = Math.log10(item['Density']);
        });
        setCsvData(results.data);
      },
    });
  }, []);

  const getMapData = () => {
    // Check if both GeoJSON and CSV data are available
    if (!geojsonData || !csvData) return null;

    const stateIdMap = {};
    geojsonData.features.forEach((feature) => {
      stateIdMap[feature.properties.st_nm] = feature.properties.state_code;
    });

    const featureIds = csvData.map((item) => stateIdMap[item['State or union territory']]);
    const values = csvData.map((item) => item['DensityScale']);

    return [
      {
        type: 'choropleth',
        geojson: geojsonData,
        locations: featureIds,
        z: values,
        colorscale: 'Viridis',
        showscale: false,
      },
    ];
  };

  return geojsonData && csvData ? (
    <Plot
      data={getMapData()}
      layout={{
        geo: {
          projection_scale: 6,
          fitbounds: 'locations',
          visible: false,
        },    
width: 800, // Set the width to your desired value
      height: 600, // Set the height to your desired value
      }}
      
    />
  ) : (
    <div>Loading...</div>
  );
};

export default ChoroplethMap;
