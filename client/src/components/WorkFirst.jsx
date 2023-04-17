import React, { useEffect } from "react";
import { workFirst } from '../assets'
import styles, { layout } from '../style'
import { workText } from '../constants';
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
                <h2 className={styles.heading2}> 
                    {workText.find(btn => btn.id === 'workfirsttitle1').title} 
                    <br className="sm:block hidden" /> 
                    {workText.find(btn => btn.id === 'workfirsttitle2').title} 
                </h2>
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                    {workText.find(btn => btn.id === 'workfirsttitle2').content} 
                </p>
            </div>
            <div data-aos="fade-left" className={layout.sectionImg}>
                <img src={workFirst} alt="workFirst" className="w-[30%] h-[30%]" />
            </div>
        </section>
    );
};
export default WorkFirst