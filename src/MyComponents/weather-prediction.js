import React, { useState, Fragment } from 'react';
import './WeatherPrediction.css'; // Stylesheet for the component
import Navbar from './Navbar';
import limageUrl from "./Images/limage2.png";
import rightImageUrl from "./Images/rimage.png";
import LowerImage from "./LowerImage";
import weather from "./Images/weather.png";
import { useTranslation } from 'react-i18next';
import Speech from './speech';
import Search from "../components/search/search";
import CurrentWeather from "../components/current-weather/current-weather";
import Forecast from "../components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";


const WeatherPrediction = () => {
  const { t } = useTranslation();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="weather-prediction">
      <Navbar />
      <Speech initialMessage="मौसम की भविष्यवाणी मे आपका स्वागत है"/>
      <Fragment>
        <img
          src={limageUrl}
          alt="Left"
          style={{ position: "absolute", top: '5rem' }}
        />
        <div className="image-component">
          <img src={weather} alt="Image" className="logopredict" />
          <p className="text-heading">{t('weathertext')}</p>
          <div
            className="uploadclass">
            
            <div className="simple">
              <Search onSearchChange={handleOnSearchChange} />
              {currentWeather && <CurrentWeather data={currentWeather} />}
              {forecast && <Forecast data={forecast} />}
            </div>
          </div>
        </div>
        <img
          src={rightImageUrl}
          alt="Right"
          style={{ position: "absolute", right: 0, top: '5rem' }}
        />
        <LowerImage />
      </Fragment>
    </div>
  );
};

export default WeatherPrediction;
