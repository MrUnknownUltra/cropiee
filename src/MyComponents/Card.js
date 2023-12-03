import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
const Card = ({ imgSrc, cropDiseaseText, infoText ,icon}) => {
  const predictionType = cropDiseaseText.split(' ')[0].toLowerCase();

  return (
    <div className="rectangle-div">
      <div className="info-container">
        <img src={imgSrc} alt="" className="crop" />
        <div className="crop-disease">{cropDiseaseText}</div>
      </div>
      <div className="align">
      <div className="info">{infoText}</div>
    <div className="predict-parent">
    <Link to={`/${predictionType}-prediction`}className="custom-link">
            <img src={icon} alt="" className="icon" />
            <div className="predict">PREDICT</div>
          </Link>
    </div>
    
    </div>
    </div>
  );
};

export default Card;