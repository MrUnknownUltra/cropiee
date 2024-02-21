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
import Card from "./Card";

import { useTranslation } from 'react-i18next';

const Group = () => {

  const { t } = useTranslation();
  
  return (
    <div>
      <div className="here-we-provide-different-func-parent">
        <div className="here-we-provide">
        {t('here-we-provide')}
        </div>
        <b className="namaste-anna-daata">{t('namaste-anna-daata')}</b>

        <b className="grow-better-for">{t('grow-better-for')}</b>

        <div className="click-here-to">
        {t('click-here-to')}
        </div>
        <div className="key-features-wrapper">
          <b className="kf">Key Features</b>
        </div>
      </div>
      <div className="key-features">Key Features</div>

      <div className="cardcontainer">
        <Card
          imgSrc={cropimg}
          cropDiseaseText={"Crop Disease & Pest Prediction"}
          infoText={
            "Here We Provide Disease and Pest Prediction of Crops Along With Severity Index"
          }
          icon={cropicon}
        />

        <Card
          imgSrc={hydro}
          cropDiseaseText={"Hydrochemical Data Analysis"}
          infoText={
            "Here We Provide Hydrochemical Data Analysis Which Will Analyse The Water Quality & Suggest Fertilizer Requirement"
          }
          icon={hydroicon}
        />

        <Card
          imgSrc={soil}
          cropDiseaseText={"Soil Nutrient Prediction"}
          infoText={
            "Here We Provide Soil Nutrient Prediction and Recommend Crops"
          }
          icon={soilicon}
        />

        <Card
          imgSrc={weather}
          cropDiseaseText={"Weather Prediction"}
          infoText={
            "Here We Provide Weather Prediction for Efficient Use Of ‘Amrit’ water"
          }
          icon={weathericon}
        />
      </div>
    </div>
  );
};

export default Group;
