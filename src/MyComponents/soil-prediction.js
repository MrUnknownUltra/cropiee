import '../App.css';
import { CirclesWithBar } from 'react-loader-spinner'; 
import React, { useState, Fragment, useEffect } from 'react';
import Navbar from './Navbar';
import Gauge from './gauge';
import AgriculturalParametersChart from './soilhistogram';
import soilimgsmall from './Images/soilimgsmall.png';
import soilicon from './Images/soilicon.png';
import uploadlogo from './Images/uploadlogo.png';
import axios from 'axios';
import { useTable } from 'react-table';
import limageUrl from "./Images/limage2.png";
import rightImageUrl from "./Images/rimage.png";
import LowerImage from "./LowerImage";
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import Speech from './speech';
const SoilPredict = () => {
  const { t } = useTranslation();
  const [showPredictedData, setShowPredictedData] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  var [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    N: 0,
    P: 5,
    K: 20,
    temperature: 25,
    humidity: 60,
    ph: 7,
    rainfall: 50
  });
  const soilpredictedcrop = 0.9;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Assuming your data is in a specific format, you can extract values from parsedData
      // For example, if your data is in rows and each row represents a parameter and its value
      const extractedValues = parsedData.slice(1).map((row) => ({
        N: row[0],
        P: row[1],
        K: row[2],
        temperature: row[3],
        pressure: row[4],
        humidity: row[5],
        ph: row[6],
      }));

      setFileData(extractedValues);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
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

  const onPredictClickHandler = () => {
    setLoading(true);
    fileData=fileData[0]
    console.log(fileData)
    values.N=fileData.N
    console.log(typeof(values.N))
    console.log(values)
    // Check if either a file has been selected or manual input values are provided
    if ((!selectedFile && values.N === 0) || (!fileData )) {
      console.log('No file selected for prediction');
      setLoading(false); // Stop loading state
      return;
    }
  
    // If file data is available, use it for prediction
    if (fileData) {
      setShowPredictedData(true);
      
      axios.post('http://127.0.0.1:8000/soilpredict', values)
        .then(response => {
          setResult(response.data['predicted_crop']);
        })
        .catch(error => {
          console.error('Prediction error:', error);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1500); // Loader will be shown for 1.5 seconds
        });
    } else {
      // If manual input values are available, use them for prediction
      setShowPredictedData(true);
      
      axios.post('http://127.0.0.1:8000/soilpredict', values)
        .then(response => {
          setResult(response.data['predicted_crop']);
        })
        .catch(error => {
          console.error('Prediction error:', error);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1500); // Loader will be shown for 1.5 seconds
        });
    }
  };

  // Define columns and data for react-table
  const columns = React.useMemo(
    () => [
      {
        Header: t('manualentry'), // Translate 'Manual Input Soil Data Values'
        columns: [
          {
            Header: t('parameter'), // Translate 'Parameter'
            accessor: 'parameter',
          },
          {
            Header: t('value'), // Translate 'Value'
            accessor: 'value',
          },
        ],
      },
    ],
    [t]
  );

  const data = React.useMemo(() => {
    if (fileData && fileData.length > 0) {
      const firstRow = fileData[0]; // Take only the first row of fileData
      return Object.entries(firstRow).map(([key, value]) => ({
        parameter: t(key), // Translate the parameter key
        value: <input type="number" name={key} value={value} onChange={handleInputChange} />,
      }));
    } else {
      // If fileData is not available or empty, use manual entry values
      return [
        {
          parameter: t('N'),
          value: <input type="number" name="N" value={values.N} onChange={handleInputChange} />,
        },
        {
          parameter: t('P'),
          value: <input type="number" name="P" value={values.P} onChange={handleInputChange} />,
        },
        {
          parameter: t('K'),
          value: <input type="number" name="K" value={values.K} onChange={handleInputChange} />,
        },
        {
          parameter: t('Temperature'),
          value: <input type="number" name="temperature" value={values.temperature} onChange={handleInputChange} />,
        },
        {
          parameter: t('Humidity'),
          value: <input type="number" name="humidity" value={values.humidity} onChange={handleInputChange} />,
        },
        {
          parameter: t('pH'),
          value: <input type="number" name="ph" value={values.ph} onChange={handleInputChange} />,
        },
        {
          parameter: t('Rainfall'),
          value: <input type="number" name="rainfall" value={values.rainfall} onChange={handleInputChange} />,
        },
      ];
    }
  }, [t, values, fileData, handleInputChange]);

  // Function to generate sample Excel file
const downloadSampleExcel = () => {
  const sampleHeaders = [
    'N',
    'P',
    'K',
    'temperature',
    'humidity',
    'ph',
    'rainfall',
  ];
  const sampleData = [sampleHeaders]; // This array contains only the header row
  const ws = XLSX.utils.aoa_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sample Data');
  XLSX.writeFile(wb, 'soil_sample_data.xlsx');
};

  // Use react-table hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div>
      <Navbar />
      <Fragment>
      <Speech initialMessage="मृदा पोषक तत्व की भविष्यवाणी मे आपका स्वागत है"/>
        <img
          src={limageUrl}
          alt="Left"
          style={{ position: "absolute", top:'5rem' }}
        />
        <div className="image-component">
          <img src={soilimgsmall} alt="Image" className="logopredict" />
          <p className="text-heading">{t('soiltext')}</p>
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
              <strong>{t('or')}</strong>
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
              <button className="download-sample" onClick={downloadSampleExcel}>
                {t('download-sample')}
              </button>
              {selectedFile && (
                <div className="selected-file">
                  <b>{t('selected-file')}</b><b> {selectedFile.name}</b>
                </div>
              )}
              {fileData && (
        <div>
          <h3>Extracted Values</h3>
          <ul>
            {fileData.map((data, index) => (
              <li key={index}>
                N: {data.N}, P: {data.P}, K: {data.K}, Temperature: {data.temperature}, Pressure: {data.pressure}, Humidity: {data.humidity}, pH: {data.ph}
              </li>
            ))}
          </ul>
          {/* Now you can use fileData for further calculations or display */}
        </div>
      )}
            </div>
          </div>
          <div {...getTableProps()} style={{backgroundColor: 'white',margin:'4rem', width: '700px', height: '450px', padding: '10px', border: '3px dashed', overflow: 'auto' }}>
            <table style={{  width: '100%', height: '100%', borderCollapse: 'collapse' }}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th style={{padding: '1rem'}} {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <button className="predict-button" onClick={onPredictClickHandler}>
              <img src={soilicon} alt="Image" />
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
        {showPredictedData && !loading && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Gauge value={soilpredictedcrop} title={result} isSoilPrediction={true} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <AgriculturalParametersChart values={values} />
            </div>
          </div>
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
};

export default SoilPredict;
