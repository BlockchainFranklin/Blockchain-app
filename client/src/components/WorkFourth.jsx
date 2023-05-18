import React, { useEffect } from "react";
import { workText } from '../constants';
import { money } from '../assets'
import styles, { layout } from '../style'
import Aos from "aos";
import "aos/dist/aos.css";

const WorkFourth = () => {
    useEffect(() => {
      Aos.init({ duration: 1500 })
    }, [])
    return (
        <section id="product" className={layout.sectionReverse}>
            <div data-aos="fade-right" className={layout.sectionImgReverse}>
                <img src={money} alt="money" className="w-[100%] h-[100%] relative z-[5] rounded-tl-100 rounded-br-5" />
            </div>
            <div data-aos="fade-right" className={layout.sectionInfo}>
                <div data-aos="zoom-in" className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full yellowdark__gradient right-1" />
                <h2 className={styles.heading2}>
                    {workText.find(btn => btn.id === 'workfourthtitle1').title}  <br className="sm:block hidden" /> 
                    {workText.find(btn => btn.id === 'workfourthtitle2').title} 
                </h2>
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                    {workText.find(btn => btn.id === 'workfourthtitle2').content} 
                </p>
            </div>
        </section>
    );
};
export default WorkFourth