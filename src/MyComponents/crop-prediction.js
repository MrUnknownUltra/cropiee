import React, { useState, useEffect, Fragment, useRef } from "react";
import { CirclesWithBar } from 'react-loader-spinner'; 
import Navbar from "./Navbar";
import Gauge from "./gaugecrop";
import cropicon from "./Images/cropicon.png";
import cropimgsmall from "./Images/cropimgsmall.png";
import "./crop-prediction.css";
import uploadlogo from './Images/uploadlogo.png';
import axios from 'axios';
import limageUrl from "./Images/limage2.png";
import rightImageUrl from "./Images/rimage.png";
import LowerImage from "./LowerImage";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Typewriter({ text = '', tagName, className }) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    function type() {
      if (index < text.length) {
        setDisplayText(prevText => prevText + text[index]);
        setIndex(prevIndex => prevIndex + 1);
      }
    }

    const timeout = setTimeout(type, 60);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [index, text]);

  return (
    <div id={tagName} className={className} style={{ minHeight: '100px' }}>
      {displayText}<span className="blinking-cursor">|</span>
    </div>
  );
}

function CropPredict() {
  
  const { t, i18n } = useTranslation();
  const [showPredictedData, setShowPredictedData] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropName, setCropName] = useState(null);
  const [cropdisease, setDisease] = useState(null);
  const [cropaccuracy, setCropAccuracy] = useState(87);
  const [cropcure, setCure] = useState(null);
  const [cropcause, setCause] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [spokenText, setSpokenText] = useState('');
  const [listening, setListening] = useState(false);
  const [navigationOptions] = useState(['hydrochemical', 'soil', 'crop', 'weather', 'about']);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

 
  const speech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    window.speechSynthesis.speak(utterance);
  };



  useEffect(() => {

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.onresult = handleSpeechResult;

    speech("फसल रोग एवं कीट भविष्यवाणी मे आपका स्वागत है")
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 's' && !listening) {
        // speech("I am Listening you can speak ")
        setListening(true);
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      }
    };

    const handleKeyRelease = (event) => {
      if (event.key === 's' && listening) {
        speech("Listening Closed ")
        setListening(false);
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyRelease);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyRelease);
    };
  }, [listening]);

  const handleSpeechResult = (event) => {
    const spokenResult = event.results[event.results.length - 1][0].transcript;
    setSpokenText(spokenResult);
    if (!listening) {
      handleSpokenCommand(spokenResult);
    }
  };

  const handleSpokenCommand = (command) => {
    const commandMappings = {
      hydrochemical: 'hydrochemical-prediction',
      soil: 'soil-prediction',
      crop: 'crop-prediction',
      weather: 'weather-prediction',
      about: 'aboutus',
      home:'home',
      browse: 'browse',
      result: 'predict'
    };
  
    const mappedRoute = commandMappings[command.toLowerCase()];
    if(mappedRoute){
      if (mappedRoute === 'browse') {
        
        document.querySelector('input[type="file"]').click();
      } 
      if (mappedRoute === 'predict') {
        handlePredictClick();
      } 
    }
      else {
        navigate(`/${mappedRoute}`);
      }
    } 
  

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result); // Set the selected image data
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDragEnter = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const onPredictClickHandler = (data) => {
    console.log(data);
    setCropName(data.crop_name);
    setDisease(data.disease);
    setCropAccuracy(data.accuracy); 
    setCure(data.Cure);
    setCause(data.Cause);
    setShowPredictedData(true);
  };
  

  const handlePredictClick = () => {
    if (selectedFile) {
      setLoading(true); // Show loader when prediction starts
      const formData = new FormData();
      formData.append('file', selectedFile);
      axios.post('http://127.0.0.1:8000/cropimage', formData)
        .then(response => {
          
            setLoading(false);
          // Hide loader when prediction is complete
          const responseData = JSON.parse(response.data.response); // Parse the JSON string
          onPredictClickHandler(responseData)
          console.log(responseData.accuracy)
        })
        .catch(error => {
          setTimeout(() => {
            setLoading(false);
          }, 1500);
          console.error('Prediction error:', error);
        });
    } else {
      console.log("No file selected for prediction");
    }
  };

  return (
    <div>
      <Navbar />
      <Fragment>
      <p className="spokentext" style={{ marginLeft: "5rem" }}>Spoken Text: {spokenText}</p>     
       <img
          src={limageUrl}
          alt="Left"
          style={{ position: "absolute", top:'5rem' }}
        />
        <div className="image-component">
          <img src={cropimgsmall} alt="Image" className="logopredict" />
          <p className="text-heading">{t('text-heading')}</p>
          <div
            className="uploadclass"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
          >
            <img src={uploadlogo} alt="Image" className="upload" />
            <p className="simple">
              {t('simple')}
              <br />
              <br />
              <strong className="or">{t('or')}</strong>
            </p>
            <div className="button-container">
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <button
                className="browse"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              >
                {t('browse')}
              </button>
              {selectedFile && (
                <div className="selected-file">
                  <b>{t('selected-file')}</b><b> {selectedFile.name}</b>
                </div>
              )}
            </div>
          </div>
          <div>
            <button className="predict-button" onClick={handlePredictClick}>
              <img src={cropicon} alt="Image" />
              <p className="predicttext">{t('predicttext')}</p>
            </button>
          </div>
        </div>
        {loading && (
          <div className="loader">
            <CirclesWithBar
              height="300"
              width="300"
              color="#4fa94d"
              outerCircleColor="#4fa94d"
              innerCircleColor="#4fa94d"
              barColor="#4fa94d"
              ariaLabel="loading"
              wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center',padding:'4rem'}}
              wrapperClass="loader"
            />      
          </div>
        )}
        {showPredictedData && (
          <>
            <div className="cpdisease">
              <p className="text-heading">{t('predictionresult')}</p>
              <div className="cpdivider">
                <div className="cpimg">
                  {selectedImage && (
                    <img src={selectedImage} alt="Predicted" />
                  )}
                </div>
                <div>
                  <div className="cpright"></div>
                  <span className="cpspan" style={{ flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                    <p className="cpbold">{t('crop')}</p>
                    <p className="cpbold" >{cropName}</p>
                  </span>
                  <span className="cpspan" style={{ flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                    <p className="cpbold">{t('disease')}</p>
                    <p className="cpbold"><b>{cropdisease}</b></p>
                  </span>
                    <span className="cpspan">
                      <p className="cpbold">{t('accuracyindex')}</p>
                      <Gauge value={cropaccuracy} />
                    </span>
                 
                  <div className="cure-and-cause">
                    <span className="cpspan">
                      <p className="cpbold">{t('cause')}</p>
                      <p className="cpvalue">
                        <Typewriter text={cropcause} tagName="cause" className="typewriter" />
                      </p>
                    </span>
                    <span className="cpspan">
                      <p className="cpbold">{t('cure')}</p>
                      <p className="cpvalue">
                        <Typewriter text={cropcure} tagName="cure" className="typewriter" />
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <img
          src={rightImageUrl}
          alt="Right"
          style={{ position: "absolute", right: 0, top: '5rem' }}
        />
        <LowerImage />
      </Fragment>
    </div>
  );
}

export default CropPredict;