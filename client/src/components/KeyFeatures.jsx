import React, { useEffect } from "react";
import styles from '../style';
import { keyFeaturesText } from '../constants';
import { blockchain, coin, dumbbells, keyfeatures } from "../assets";
import Aos from "aos";
import "aos/dist/aos.css";

const KeyFeatures = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])

  return (
    <section id="features" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div data-aos="zoom-in" className="absolute z-[0] w-[100%] h-[100%] rounded-full lightblue__gradient bottom-0" />
  </div> 
      <div data-aos="fade-up">
      <div className="flex items-center justify-center">
      <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-yellow text-center" style={{ float: 'left', marginRight: '10px' }}>
        Key
      </h4>
      <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-violet text-center" style={{ float: 'left' }}>
        Features
      </h4>
      <div style={{ clear: 'both' }}></div>
      </div>
        <br />
        <br />
        <div className="row">
        <div className=" col-8" >
        <p className="font-poppins font-normal xs:text-[24.45px] text-[15.45px] xs:leading-[36.58px] leading-[30.58px] text-white text-center">
            {keyFeaturesText.find(btn => btn.id === 'keyfeatures').content}
          </p>
        </div>
        </div>
        <div class="col-12">
        <img src={keyfeatures} class="img-fluid" alt="Grafika"/>
      </div>

      </div>

{/*
      <div className="w-full pt-160 mt-6 container" style={{paddingTop: '15vh'}}>
        <div className="row d-flex">
          <div data-aos="fade-right" data-aos-delay="100" className="box2 box2-first">
            <img src={blockchain} alt="blockchain"/>
            <h2 className="font-poppins font-semibold xs:text-[30.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-yellow text-center">
            Use Blockchain system</h2>
          </div>
          <div data-aos="fade-right" data-aos-delay="200" className="box2 box2-second" >
            <img src={dumbbells} alt="dumbbells"/>
            <h2 className="font-poppins font-semibold xs:text-[30.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-yellow text-center">
            Be motivated to work</h2>
          </div>

          <div data-aos="fade-right" data-aos-delay="300" className="box2 box2-third" >
            <img src={coin} alt="dumbbells"/>
            <h2 className="font-poppins font-semibold xs:text-[30.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-yellow text-center">           
            Earn money</h2>
          </div>
        </div>
      </div>
  */}
    </section>
  );
};

export default KeyFeatures