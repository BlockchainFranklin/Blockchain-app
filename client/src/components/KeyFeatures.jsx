import React, { useEffect } from "react";
import styles from '../style';
import { keyFeaturesText } from '../constants';
import Aos from "aos";
import "aos/dist/aos.css";

const KeyFeatures = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])

  return (
    <section id="features" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
      <div data-aos="zoom-in" className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" /> 
      <div data-aos="fade-up">
        <h2 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-main text-center">
          {keyFeaturesText.find(btn => btn.id === 'keyfeatures').title}
          <br className="sm:block hidden" /> 
        </h2>
        <br />
        <br />
        <div className="w-full md:mt-0 mt-6">
          <p className={"font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-white text-center"}>
            {keyFeaturesText.find(btn => btn.id === 'keyfeatures').content}
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div data-aos="fade-right" data-aos-delay="100" data-aos-duration="9000" className="box2" />
          <div data-aos="fade-right" data-aos-delay="200" className="box2" />
          <div data-aos="fade-right" data-aos-delay="300" className="box2" />
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures