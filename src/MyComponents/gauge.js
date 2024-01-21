// Gauge.js

import React, { useState, useEffect } from 'react';
import './gauge.css';
import gauge from './Images/gauge.png';

const Gauge = ({ value, title }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {

    const calculatedRotation = (value) * 180;
    const clampedRotation = Math.max(0, Math.min(calculatedRotation, 180));

    setRotation(clampedRotation);
  }, [value]);

  return (
    <div className="gauge-box">
      <div className='watertitle'>{title}</div>
      <div className="gauge-container">
        <img src={gauge} alt="Gauge" className="gauge-image" />
        <div className="gauge-pointer" style={{ transform: `translateY(-50%) rotate(${rotation}deg)` }}></div>
        <div className="gauge-value-label">Gauge Value: {Math.round(value * 100)}%</div>
        <div className="label-container">
          <div className="color-labels">
            <div className='color-label'>
              <div style={{background:'red', width:'10px', height:'10px', marginRight:'10px'}}></div>
              <div>0%</div>
            </div>
            <div className='color-label'>
              <div style={{background:'orange', width:'10px', height:'10px', marginRight:'10px'}}></div>
              <div>25%</div>
            </div><div className='color-label'>
              <div style={{background:'yellow', width:'10px', height:'10px', marginRight:'10px'}}></div>
              <div>50%</div>
            </div><div className='color-label'>
              <div style={{background:'lightgreen', width:'10px', height:'10px', marginRight:'10px'}}></div>
              <div>75%</div>
            </div><div className='color-label'>
              <div style={{background:'darkgreen', width:'10px', height:'10px', marginRight:'10px'}}></div>
              <div>100%</div>
            </div>
            {/* <div className="color-label red" style={{ '--angle': '0', '--percent': '0' }}><div className='side-label'>0</div></div>
            <div className="color-label orange" style={{ '--angle': '45', '--percent': '25%' }}>25%</div>
            <div className="color-label yellow" style={{ '--angle': '90', '--percent': '50%' }}>50%</div>
            <div className="color-label light-green" style={{ '--angle': '135', '--percent': '75%' }}>75%</div>
            <div className="color-label dark-green" style={{ '--angle': '180', '--percent': '100%' }}>100%</div> */}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Gauge;
