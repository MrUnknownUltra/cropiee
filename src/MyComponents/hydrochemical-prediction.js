import '../App.css';
import React, { useState ,Fragment, useEffect} from 'react';
import { CirclesWithBar } from 'react-loader-spinner'; 
import Navbar from './Navbar';
import Gauge from './gauge';
import Pie from './graphs';
import SARChart from './histogram';
import WaterPotabilityResults from './statistics';
import uploadlogo from './Images/uploadlogo.png';
import axios from 'axios';
import { useTable } from 'react-table';
import limageUrl from "./Images/limage2.png";
import rightImageUrl from "./Images/rimage.png";
import LowerImage from "./LowerImage";
import hydroimgsmall from './Images/hydrochem.png'
import hydroicon from './Images/hydroicon.png'
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import Speech from './speech';
function HydroPredict() {
  const { t } = useTranslation();
  const [showPredictedData, setShowPredictedData] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const[result,setResult]=useState(null);
  var   [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    ph: 7.5,
    Hardness: 150,
    Solids: 300,
    Chloramines: 0.8,
    Sulfate: 200,
    Conductivity: 500,
    Organic_carbon: 15,
    Trihalomethanes: 50,
    Turbidity: 5,
    Sodium:33,
    Magnesium: 233,
    Calcium: 33,
    
  });
  useEffect(() => {
    console.log("File Data Updated:", fileData);
  }, [fileData]);

const title="Water"
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const extractedValues = parsedData.slice(1).map((row) => ({
        ph: row[0],
        Hardness: row[1],
        Solids: row[2],
        Chloramines: row[3],
        Sulfate: row[4],
        Conductivity: row[5],
        Organic_carbon: row[6],
        Trihalomethanes: row[7],
        Turbidity: row[8],
        Sodium:row[9],
        Magnesium: row[10],
        Calcium: row[11],
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
    let allinputValues = fileData ? { ...fileData[0] } : { ...values };
    let predictionValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => !['Sodium', 'Magnesium', 'Calcium'].includes(key))
    );

    if ((!selectedFile && values.N === 0) || (!predictionValues)) {
      console.log('No file selected for prediction');
      setLoading(false);
      return;
    }

    setShowPredictedData(true);

    axios.post('http://127.0.0.1:8000/waterpredict', predictionValues)
      .then(response => {
        setResult(response.data['Potability']);
        console.log(response.data['Potability'])
      })
      .catch(error => {
        console.error('Prediction error:', error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Manual Input Hydrochemical Data Values',
        columns: [
          {
            Header: 'Parameter',
            accessor: 'parameter',
          },
          {
            Header: 'Value',
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
        value: <input type="number" name={key} value={value} onChange={handleInputChange} step="0.01"/>,
      }));
    } else {
      // If fileData is not available or empty, use manual entry values
      return [
        {
          parameter: 'pH',
          value: <input type="number" name="ph" value={values.ph} onChange={handleInputChange} step="0.01"/>,
        },
        {
          parameter: 'Hardness',
          value: <input type="number" name="Hardness" value={values.Hardness} onChange={handleInputChange} step="0.01"/>,
        },
        {
          parameter: 'Solids',
          value: <input type="number" name="Solids" value={values.Solids} onChange={handleInputChange} step="0.01"/>,
        },
        {
          parameter: 'Chloramines',
          value: <input type="number" name="Chloramines" value={values.Chloramines} onChange={handleInputChange} step="0.01"/>,
        },
        {
          parameter: 'Sulfate',
          value: <input type="number" name="Sulfate" value={values.Sulfate} onChange={handleInputChange} step="0.01"/>,
        },
        {
          parameter: 'Conductivity',
          value: <input type="number" name="Conductivity" value={values.Conductivity} onChange={handleInputChange} step="0.01"/>,
        },
        {
          parameter: 'Organic_carbon',
          value: <input type="number" name="Organic_carbon" value={values.Organic_carbon} onChange={handleInputChange} step="0.01"/>,
        },
        {
          parameter: 'Trihalomethanes',
          value: <input type="number" name="Trihalomethanes" value={values.Trihalomethanes} onChange={handleInputChange} step="0.01"/>,
        },
        {
          parameter: 'Turbidity',
          value: <input type="number" name="Turbidity" value={values.Turbidity} onChange={handleInputChange} step="0.01"/>,
        },
        {
          parameter: 'Sodium',
          value: <input type="number" name="Sodium" value={values.Sodium} onChange={handleInputChange} step="0.01"/>,
        },
        {
          parameter: 'Magnesium',
          value: <input type="number" name="Magnesium" value={values.Magnesium} onChange={handleInputChange} step="0.01"/>,
        },
        {
          parameter: 'Calcium',
          value: <input type="number" name="Calcium" value={values.Calcium} onChange={handleInputChange} step="0.01"/>,
        },
      ];
    }
  }, [t, values, fileData, handleInputChange]);

  // Function to generate sample Excel file
const downloadSampleExcel = () => {
  const sampleHeaders = [
    'ph',
    'Hardness',
    'Solids',
    'Chloramines',
    'Sulfate',
    'Conductivity',
    'Organic_carbon',
    'Trihalomethanes',
    'Turbidity',
    'Sodium',
    'Magnesium',
    'Calcium',
  ];
  const sampleData = [sampleHeaders]; // This array contains only the header row
  const ws = XLSX.utils.aoa_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sample Data');
  XLSX.writeFile(wb, 'hydro_sample_data.xlsx');
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
      <Speech initialMessage="हाइड्रोकेमिकल डेटा विश्लेषण मे आपका स्वागत है"/>
      <img
        src={limageUrl}
        alt="Left"
        style={{ position: "absolute", top:'5rem' }}
      />
        <div className="image-component">
          
          <img src={hydroimgsmall} alt="Image" className="logopredict" />

          <p className="text-heading">{t('hydroText')}</p>
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
                    Turbidity: {data.Turbidity},
                    Trihalomethanes: {data.Trihalomethanes},
                     Organic Carbon: {data.Organic_carbon}, 
                     Conductivity: {data.Conductivity},
                      Sulfate: {data.Sulfate}, 
                      Chloramines: {data.Chloramines}, 
                      Solids: {data.Solids}, 
                      Hardness: {data.Hardness}, 
                      pH: {data.ph},
                      Sodium: {data.Sodium},
                      Magnesium: {data.Magnesium},
                      Calcium: {data.Calcium}
                  </li>
                ))}
              </ul>
            </div>)}
            </div>
          </div>

          <div {...getTableProps()} style={{backgroundColor: 'white', margin:'4rem', width: '90%', padding: '10px', border: '3px dashed', borderRadius: '5px', overflowX: 'auto' }}>
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        {data.map((item, index) => (
          <th key={index} style={{padding: '1rem'}}>{item.parameter}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        {data.map((item, index) => (
          <td key={index} style={{padding: '1rem'}}>{item.value}</td>
        ))}
      </tr>
    </tbody>
  </table>
</div>
          
          <div>
            <button className="predict-button" onClick={onPredictClickHandler}>
              <img src={hydroicon} alt="Image" />
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
        {showPredictedData &&  !loading &&(  
          <div
          
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Gauge value={result}
            title={title}
            isSoilPrediction={false} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Pie values={fileData }/>
              <p>Values:</p>
              <ul>
                {Object.entries(values).map(([key, value]) => (
                  <li key={key}>{key}: {value}</li>
                ))}
              </ul>
          <SARChart data={fileData}/>
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

export default HydroPredict;
