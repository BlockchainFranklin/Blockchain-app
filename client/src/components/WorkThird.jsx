import React, { useEffect } from "react";
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
            <h2 className={styles.heading2}>Share QR 
            <br className="sm:block hidden" /> on social media </h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>Users have the option to share their QR code on their social media profiles, inviting friends and followers to join the app and earn tokens together.</p>
        </div>

        <div data-aos="fade-left" className={layout.sectionImg}>
            <img src={icons} alt="icons" className="w-[50%] h-[50%]" />
        </div>

    </section>
    );
};
export default WorkThird