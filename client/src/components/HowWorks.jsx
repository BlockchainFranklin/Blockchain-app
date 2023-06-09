import React, { useEffect } from "react";
import styles from '../style';
import Aos from "aos";
import "aos/dist/aos.css";
import { howuse } from "../assets";


const HowWorks = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])

  return (
    <section id="strategy" className={`${styles.paddingY} 
    ${styles.flexCenter} flex-col relative`}>
        <div data-aos="fade-up" className="">
        <div className="absolute z-[0] w-[100%] h-[100%] rounded-full yellowdark__gradient bottom-0" />
        <div className="flex items-center justify-center">
        <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-yellow text-center" style={{zIndex: 2, float: 'left', marginRight: '10px' }}>
          How it
        </h4>
        <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-violet text-center" style={{zIndex: 2, float: 'left' }}>
          works
        </h4>
        <div style={{ clear: 'both' }}></div>
        </div>

        <div className="w-full md:mt-0 mt-6">
          <div class="col-12">
              <img src={howuse} class="img-fluid" alt="Grafika"/>
            </div>
        </div>
        
      </div>
    </section>
  );
};

export default HowWorks