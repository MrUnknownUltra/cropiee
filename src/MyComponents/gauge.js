import React, { useState, useEffect } from 'react';
import './gauge.css';
import gauge from './Images/gauge.png';
import { useTranslation } from 'react-i18next';

const Gauge = ({ value, title, isSoilPrediction }) => {
  const { t } = useTranslation();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const calculatedRotation = value * 180;
    const clampedRotation = Math.max(0, Math.min(calculatedRotation, 180));
    setRotation(clampedRotation);
  }, [value]);

  return (
    <div className="gauge-box">
      <div className="bg" style={{ background: 'green', padding: '10px' }}>
        <div className={isSoilPrediction ? 'watertitle' : 'title'}>
          {isSoilPrediction ? t('predictedCrop', { title }) : title}
        </div>
      </div>
      <div className="gauge-container">
        <img src={gauge} alt="Gauge" className="gauge-image" />
        <div className="gauge-pointer" style={{ transform: `translateY(-50%) rotate(${rotation}deg)` }}></div>
        <div className="gauge-value-label">{t('gaugeValue', { value: Math.round(value * 100) })}</div>
        <div className="label-container">
          <div className="color-labels">
            <div className='color-label'>
              <div style={{ background: 'red', width: '10px', height: '10px', marginRight: '10px' }}></div>
              <div>0%</div>
            </div>
            <div className='color-label'>
              <div style={{ background: 'orange', width: '10px', height: '10px', marginRight: '10px' }}></div>
              <div>25%</div>
            </div>
            <div className='color-label'>
              <div style={{ background: 'yellow', width: '10px', height: '10px', marginRight: '10px' }}></div>
              <div>50%</div>
            </div>
            <div className='color-label'>
              <div style={{ background: 'lightgreen', width: '10px', height: '10px', marginRight: '10px' }}></div>
              <div>75%</div>
            </div>
            <div className='color-label'>
              <div style={{ background: 'darkgreen', width: '10px', height: '10px', marginRight: '10px' }}></div>
              <div>100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gauge;
