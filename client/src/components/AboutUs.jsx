import React, { useEffect } from "react";
import { visionText } from '../constants';
import styles from '../style';
import Aos from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    Aos.init({ offset: 200, duration: 900, delay: 500 })
  }, [])

  return(
    <section id="vision" className={`${styles.flexDiv}}`}>    
        {/* colored horizontal line */}
        {/* PRZENIEŚĆ DO CSS! */}

        <div data-aos="zoom-in" style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.8) 48%, rgba(255, 255, 255, 0.8) 5%, transparent 100%)',
          height: '4px',
          marginBottom: '10px'
        }}>
          <hr style={{ opacity: '0.3', margin: '0' }}/>
        </div>
        <br />
        <div data-aos="fade-up" className={`flex-1 `}>
        <div className="flex items-center justify-center">
        <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-yellow text-center" style={{ float: 'left', marginRight: '10px' }}>
          Our
        </h4>
        <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-violet text-center" style={{ float: 'left' }}>
          Vision
        </h4>
        <div style={{ clear: 'both' }}></div>
      </div>
          
        </div>
        <br />
        <br />
        <div data-aos="fade-up" className="container">
          <div className="row">
            <div className="col-9">
            <p className="font-poppins font-normal xs:text-[24.45px] text-[15.45px] xs:leading-[36.58px] leading-[21.58px] text-white text-center">
            {visionText.find(btn => btn.id === 'ourvision').content}
          </p>
            </div>
          </div>
        </div>
    </section>
  )
}
export default AboutUs