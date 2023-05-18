import React, { useEffect } from "react";
import styles from '../style';
import Aos from "aos";
import "aos/dist/aos.css";
import { roadmap } from "../assets";

const Roadmap = () => {
  return (
    <section id="roadmap" className={`${styles.paddingY} 
    ${styles.flexCenter} flex-col relative`}>
        <div data-aos="fade-up" className="">
        <div className="absolute z-[0] w-[100%] h-[100%] rounded-full darkblue__gradient bottom-0" />
        <div className="absolute z-[0] w-[80%] h-[80%] rounded-full darkviolet__gradient bottom-0" />
        <div className="flex items-center justify-center">
        <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-yellow text-center" style={{ zIndex: 2, float: 'left', marginRight: '10px' }}>
          Future
        </h4>
        <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-violet text-center" style={{ zIndex: 2, float: 'left' }}>
          Roadmap
        </h4>
        <div style={{ clear: 'both' }}></div>
        </div>

        <div className="w-full md:mt-0 mt-6">
        <br />
        <br />
        <br />
        <div className="col-12 flex items-center justify-center">
        <div className="image-container">
          <img src={roadmap} className="img-fluid h-auto" alt="Grafika" />
          </div>
        </div>
      </div>
      
        
      </div>
    </section>
  )
}

export default Roadmap