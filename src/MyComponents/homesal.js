import "./homesal.css";
import cropimg from "./Images/cropimage.png";
import soil from "./Images/soilnut.png";
import weather from "./Images/weather.png";
import hydro from "./Images/hydrochem.png";
import plant from "./Images/plant.png";
import soilicon from "./Images/soilicon.png";
import hydroicon from "./Images/hydroicon.png";
import cropicon from "./Images/cropicon.png";
import weathericon from "./Images/weathericon.png";
import voice from "./Images/Saathi.png"
import "./Popup.css"
import Speech from "./speech";
import Card from "./Card";
import { Audio } from 'react-loader-spinner'; 
import React, { useState ,useEffect} from 'react';
import { useTranslation } from 'react-i18next';

const Group = () => {

  console.log("group1")
  const { t } = useTranslation();
  var [popupVisible, setPopupVisible] = useState(false);

const togglePopup = () => {
  console.log(popupVisible)
  popupVisible=!popupVisible
    setPopupVisible(!popupVisible);
    if (popupVisible) {
        // Start reading the popup text when the popup is opened
        console.log(popupVisible)
        speech("Voice Navigation Features. Press 's' button to speak & say: home, crop, hydrochemical, soil, weather, browse, result, or about.");
    } else {
        // Stop reading when the popup is closed
        console.log(popupVisible)
        window.speechSynthesis.cancel();
    }
};
  const speech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    window.speechSynthesis.speak(utterance);
  };

  console.log("group2")
  return (
    <div>
      <div className="box">
	<a className="button" href="#popup1"onClick={() => togglePopup()}><img src={voice}  className="voice" alt="Voice Enabled" /></a>
</div>

<div id="popup1" className="overlay">
    <div className="popup">
        <h2>Voice Navigation Features</h2>
        <a className="close" href="#">&times;</a>
        <div className="content">
            <p>Press <em>'s'</em> button to speak & say:</p>
            <ul>
                <li><em>'home'</em> - to navigate to home</li>
                <li><em>'crop'</em> - to navigate to Crop Prediction Page</li>
                <li><em>'hydrochemical'</em> - to navigate to Hydrochemical Page</li>
                <li><em>'soil'</em> - to navigate to Soil Nutrient Page</li>
                <li><em>'weather'</em> - to navigate to Weather Prediction Page</li>
                <li><em>'browse'</em> - to select a file</li>
                <li><em>'result'</em> - to start analysis</li>
                <li><em>'about'</em> - to navigate to the about us page</li>
                      </ul>
                  </div>
              </div>
          </div>
              
      <div className="here-we-provide-different-func-parent">
        <div className="here-we-provide">
        {t('here-we-provide')}
        </div>
        <b className="namaste-anna-daata">{t('namaste-anna-daata')}</b>

        <b className="grow-better-for">{t('grow-better-for')}</b>

        <div className="click-here-to">
        {t('click-here-to')}
        </div>
      </div>

      <div className="key-features">{t('key-features')}</div>

      <div className="voice-component">
        <div className="uploadclass">
          <div className="simple">
            
            <div className="loader">
              <Audio height="50" width="50" color="green" ariaLabel="audio-loading" wrapperStyle={{}} wrapperClass="wrapper-class" visible={true} />    
            </div>
            <Speech />
          </div>
        </div>
      </div>
      <div className="cardcontainer">
        <Card
          imgSrc={cropimg}
          link={'crop'}
          cropDiseaseText={t('cropDiseaseText')}
          infoText={
            t('infoText')
          }
          icon={cropicon}
        />

        <Card
          imgSrc={hydro}
          link={'hydrochemical'}
          cropDiseaseText={t('hydroText')}
          infoText={
            t('hydroinfo')
          }
          icon={hydroicon}
        />

        <Card
          imgSrc={soil}
          link={'soil'}
          cropDiseaseText={t('soiltext')}
          infoText={
            t('soilinfo')
          }
          icon={soilicon}
        />

        <Card
          imgSrc={weather}
          link={'weather'}
          cropDiseaseText={t('weathertext')}
          infoText={
            t('weatherinfo')
          }
          icon={weathericon}
        />
      </div>

      
    </div>
  );
};

export default Group;