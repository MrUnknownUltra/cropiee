import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const Speech= ({ initialMessage }) => {
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
    speech(initialMessage);
  }, [initialMessage]);

  useEffect(() => {
    
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.onresult = handleSpeechResult;

    
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
      home:'home'
    };
  
    const mappedRoute = commandMappings[command];
    if (mappedRoute) {
      console.log('Navigating to:', mappedRoute);
      navigate(`/${mappedRoute}`);
    } else {
      console.log('Command not recognized:', command);
      // Provide feedback or take default action
    }
  };

  return (
    <div>
      <p className="spokentext">Spoken Text: {spokenText}</p>
    </div>
  );
};

export default Speech;
