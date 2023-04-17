import React, { useEffect } from "react";
import styles from '../style';
import Aos from "aos";
import "aos/dist/aos.css";

const HowWorks = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])

  return (
    <section id="highlights" className={`${styles.paddingY} 
    ${styles.flexCenter} flex-col relative`}>
        <div data-aos="fade-up" className="">
          <h2 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-main text-center">
            How it works! <br className="sm:block hidden" /> 
          </h2>
      </div>
    </section>
  );
};

export default HowWorks