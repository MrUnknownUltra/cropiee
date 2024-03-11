import './App.css';
import React, { useState } from 'react';
import Decoration from './MyComponents/Decoration';
import Cholorpeth from './MyComponents/Cholorpeth';
import Gauge from './MyComponents/gauge';
import SARChart from './MyComponents/chart';
import HydrochemicalDataVisualization from './MyComponents/graphs';
import Stats from './MyComponents/statistics';
import AgriculturalParametersChart from './MyComponents/soilhistogram';
import HydroPredict from './MyComponents/hydrochemical-prediction';
import Homedecor from './MyComponents/homedecor';
import SoilPredict from './MyComponents/soil-prediction';
import CropPredict from './MyComponents/crop-prediction';
import WeatherPrediction from './MyComponents/weather-prediction';
import AboutUs from './MyComponents/Aboutus';
import MyWebsite from './MyComponents/speech';
import Pie from './MyComponents/graphs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
<Router>
      <Routes>
        <Route path="/home" element={<Homedecor/>} />
        <Route path="/" element={<Homedecor/>} />
        <Route path="/hydrochemical-prediction" element={<HydroPredict />} />
        <Route path="/soil-prediction" element={<SoilPredict />} />
        <Route path="/crop-prediction" element={<CropPredict />} />
        <Route path="/weather-prediction" element={<WeatherPrediction />} />
        <Route path="/speech" element={<MyWebsite/>} />
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/decoration" element={<Decoration />} />
        <Route path="/chloropheth" element={<Cholorpeth />} />
        <Route path="/gauge" element={<Gauge />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/sar-chart" element={<SARChart />} />
        <Route path="/hydrochemical-visualization" element={<HydrochemicalDataVisualization />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/agricultural-parameters-chart" element={<AgriculturalParametersChart />} />
      </Routes>
    </Router>
  );
}

export default App;
