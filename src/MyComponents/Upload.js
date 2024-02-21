import React, { Fragment, useState } from "react";
import "./Upload.css";
import imageUrl from "./Images/hydologo.png";
import uploadlogo from "./Images/uploadlogo.png";
import Gauge from "./gauge";
import Pie from "./graphs";
import Decoration from "./Decoration";
import SARChart from "./histogram";
import hydrologopredict from "./Images/hydropredictlogo.png";
import SoilPredict from "./soil-prediction";
import axios from 'axios';
import hydroimgsmall from "./Images/hydrochem.png";
import hydroicon from "./Images/hydroicon.png";

const Upload = ({ imgSrc, featureText, icon, onPredictClick }) => {
  const [showPredictedData, setShowPredictedData] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [disease, setdisease] = useState(null)
  const [accuracy,setaccuracy]=useState(null)
  const waterQualityValue = 0.9;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const onPredictClicke = () => {
    // Handle the logic for predicting with the selected file
    if (selectedFile) {
        // Construct the request payload
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Make a POST request to the API endpoint
        axios.post('http://127.0.0.1:8000/croppredict', formData)
            .then(response => {
                // Handle the response data
                console.log('Prediction response:', response.data);
                setdisease(response.data['class'])
                setaccuracy(response.data['confidence'])
                response=response.data+selectedFile
                console.log(response)
                onPredictClick(response)
                // Perform any further processing or display of predicted data
                setShowPredictedData(true);
            })
            .catch(error => {
                // Handle errors
                console.error('Prediction error:', error);
                // Optionally, you can display an error message or take other actions
            });
    } else {
        console.log("No file selected for prediction");
    }
};


  return (
    <Fragment>
      <div className="image-component">
        <img src={imgSrc} alt="Image" className="logopredict" />

        <p className="text-heading">{featureText}</p>
        <div
          className="uploadclass"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDrop={handleDrop}
        >
          <img src={uploadlogo} alt="Image" className="upload" />

          <p className="simple">
            Drag and Drop files to upload
            <br />
            <br />
            <strong>OR</strong>
          </p>

          <div className="button-container">
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button
              className="browse"
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
            >
              Browse
            </button>
            {selectedFile && (
              <div className="selected-file">
                <b>Selected File: {selectedFile.name}</b>
              </div>
            )}
          </div>
        </div>
        <div>
          <button className="predict-button" onClick={onPredictClicke}>
            <img src={icon} alt="Image" />
            <p className="predicttext">PREDICT</p>
          </button>
        </div>
      </div>
      {showPredictedData && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Gauge value={accuracy} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pie />
            <SARChart />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Upload;
