/* Decoration.js */

import React, { Fragment, useEffect, useRef } from "react";
import "./Decoration.css";
import limageUrl from "./Images/limage2.png";
import rightImageUrl from "./Images/rimage.png";
import lowerleft from "./Images/lowerleft.png";
import lowerright from "./Images/lowerright.png";
import Upload from "./Upload";
import LowerImage from "./LowerImage";

const Decoration = ({ onPredictClick, imgSrc, featureText, icon }) => {

  return (
    <Fragment>
      <img
        src={limageUrl}
        alt="Left"
        style={{ position: "absolute", top:'5rem' }}
      />
      <div className="container">
        <div className="main-content">
          <Upload
            onPredictClick={onPredictClick}
            imgSrc={imgSrc}
            featureText={featureText}
            icon={icon}
          />
        </div>
      </div>

      <img
        src={rightImageUrl}
        alt="Right"
        style={{ position: "absolute", right: 0, top: '5rem' }}
      />

    <LowerImage />
    </Fragment>
  );
};

export default Decoration;
