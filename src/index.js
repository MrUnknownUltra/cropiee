import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import App from './App';
import reportWebVitals from './reportWebVitals';

import bundeliTranslation from './Lang/bundeli.json';
import enTranslation from './Lang/en.json';
import hiTranslation from './Lang/hi.json';
import punTranslation from './Lang/pun.json';
import bhojTranslation from './Lang/bhoj.json';
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      hi: {
        translation: hiTranslation
      },
      pun:{
        translation: punTranslation
      },
      bhoj:{
        translation: bhojTranslation
      },
      bundeli:{
        translation: bundeliTranslation
      }
      // Add more languages as needed
    },
    fallbackLng: 'en', // Default language fallback
    detection: {
      order: ['localStorage', 'navigator']
    },
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
