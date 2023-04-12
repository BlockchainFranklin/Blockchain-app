import React, { useEffect } from "react";
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
                <img src={money} alt="money" className="w-[40%] h-[65%] relative z-[5] rounded-tl-100 rounded-br-5" />
        
            </div>

            <div data-aos="fade-right" className={layout.sectionInfo}>
            <div data-aos="zoom-in" className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full darkblue__gradient right-1" />
            <h2 className={styles.heading2}>
                Earn <br className="sm:block hidden" /> money
            </h2>

            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Each time the user completes a workout session and checks out of the gym, they earn tokens which can be exchanged for real money or used to access various fitness-related products and services on the app.
            </p>

          </div>
        </section>
    );
};

export default WorkFourth