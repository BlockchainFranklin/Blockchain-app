import React, { useEffect } from "react";
import { workText } from '../constants';
import { icons } from '../assets'
import styles, { layout } from '../style'
import Aos from "aos";
import "aos/dist/aos.css";

const WorkThird = () => {
    useEffect(() => {
      Aos.init({ duration: 1500 })
    }, [])
  
    return (
        <section className={layout.section}>
            <div data-aos="fade-left" className={layout.sectionInfo}>
                <div data-aos="zoom-in" className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full darkblue__gradient left-1" />
                <h2 className={styles.heading2}>
                    {workText.find(btn => btn.id === 'workthirdtitle1').title} 
                    <br className="sm:block hidden" /> 
                    {workText.find(btn => btn.id === 'workthirdtitle2').title} 
                </h2>
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                    {workText.find(btn => btn.id === 'workthirdtitle2').content} 
                </p>
            </div>
            <div data-aos="fade-left" className={layout.sectionImg}>
                <img src={icons} alt="icons" className="w-[50%] h-[50%]" />
            </div>
        </section>
    );
};
export default WorkThird