import React, { useEffect } from "react";
import { workFirst } from '../assets'
import styles, { layout } from '../style'
import Aos from "aos";
import "aos/dist/aos.css";

const WorkFirst = () => {
    useEffect(() => {
      Aos.init({ duration: 1500 })
    }, [])
  
    return (
    <section className={layout.section}>
        <div data-aos="fade-left" className={layout.sectionInfo}>
        <div data-aos="zoom-in" className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full darkblue__gradient left-1" />
            <h2 className={styles.heading2}>Go to 
            <br className="sm:block hidden" /> the gym </h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>Users can choose from a list of participating gyms on the app and check-in when they arrive at the gym.</p>
        </div>

        <div data-aos="fade-left" className={layout.sectionImg}>
            <img src={workFirst} alt="workFirst" className="w-[30%] h-[30%]" />
        </div>

    </section>
    );
};
export default WorkFirst