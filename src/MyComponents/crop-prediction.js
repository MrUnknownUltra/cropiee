import "../App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Decoration from "./Decoration";
import Gauge from "./gauge";
import WaterPotabilityResults from "./statistics";
import plant from "./Images/lateblight.JPG";
import cropicon from "./Images/cropicon.png";
import cropimgsmall from "./Images/cropimgsmall.png";
import "./crop-prediction.css";

console.log(WaterPotabilityResults.mean);
function Typewriter({ text, tagName, className }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typewriter = document.getElementById(tagName);

    function type() {
      if (index < text.length) {
        typewriter.innerHTML =
          text.slice(0, index) +
          '<span class="blinking-cursor">|</span>';
        setIndex(prevIndex => prevIndex + 1);
      }
    }

    if (index < text.length) {
      const timeout = setTimeout(type, 80);

      // Cleanup function to clear the timeout when the component unmounts
      return () => clearTimeout(timeout);
    }

  }, [index, text, tagName]);

  return (
    <div id={tagName} className={className} style={{ minHeight: '100px' /* Adjust as needed */ }} />
  );
}

function CropPredict() {
  const [showPredictedData, setShowPredictedData] = useState(false);
  const [result, setResult] = useState(null)
  const waterQualityValue = 0.2;

  const handlePredictClick = (data) => {
    setResult(data.data)
    console.log(data.data)
    // setShowPredictedData(true);
  };
  const causeText = "Potato late blight is caused by a fungus-like microorganism called Phytophthora infestans. It spreads through spores carried by wind and water. Warm and humid weather conditions, especially during the growing season, create an ideal environment for the disease to thrive.";

  const cureText = "Curing late potato blight involves a combination of preventive measures and responsive actions. To begin, farmers should choose resistant potato varieties when possible, as this can reduce the risk of infection. Crop rotation and proper spacing between plants help to minimize humidity, limiting the favorable conditions for the disease. Regularly inspecting plants for early signs of blight, such as dark lesions on leaves, allows for swift intervention.\n\nFungicides specifically designed for late blight can be applied preventively during the growing season, especially in regions prone to the disease. Early detection is crucial, and infected plants should be promptly removed and destroyed to prevent further spread. Additionally, promoting good air circulation by avoiding excessive irrigation and pruning lower leaves can mitigate the risk of infection.\n\nFarmers must stay informed about weather conditions, as warm and humid environments facilitate blight development. Timely and accurate weather-based disease forecasts can guide farmers in making informed decisions regarding fungicide application.\n\nImplementing these comprehensive strategies, encompassing resistant varieties, cultural practices, and vigilant disease management, can contribute to an effective and sustainable approach to curing late potato blight.";

  return (
    <div>
      <Navbar />
      <Decoration
        onPredictClick={handlePredictClick}
        imgSrc={cropimgsmall}
        featureText={"Crop Disease & Pest Prediction"}
        icon={cropicon}
      />
      {!showPredictedData && (
        <>
          <div className="cpdisease">
            <p className="text-heading">Prediction Results</p>
            <div className="cpdivider">
              <div className="cpimg">
                <img className="cpimg" src={plant} alt="Crop Disease" />
              </div>
              <div>
                <div className="cpright"></div>
                <span className="cpspan" style={{flexDirection:'row',gap:'1rem', alignItems:'center'}}>
                  <p className="cpbold">Crop :</p>
                  <p className="cpbold" >Potato</p>
                </span>
                <span className="cpspan" style={{flexDirection:'row',gap:'1rem', alignItems:'center'}}>

                  <p className="cpbold">Disease :</p>
                  <p className="cpbold"><b>{result && result.class}</b></p>
                </span>
                <span className="cpspan">
                  <p className="cpbold">Accuracy Index :</p>
                  <Gauge value={result && result.confidence}></Gauge>
                </span>
                <div className="cure-and-cause">

                <span className="cpspan">
                  <p className="cpbold">Cause of Disease</p>
                  <p className="cpvalue">
                  <Typewriter text={causeText} tagName="causeTypewriter" className="typewriter" />
                  </p>
                </span>
                <span className="cpspan">
                  <p className="cpbold">Cure of Disease</p>
                  <p className="cpvalue">
                  <Typewriter text={cureText} tagName="cureTypewriter" className="typewriter" />
                  </p>
                </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CropPredict;
