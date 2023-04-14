import React, { useEffect } from "react";
import { googleSoon, qr } from '../assets'
import styles, { layout } from '../style'
import Aos from "aos";
import "aos/dist/aos.css";


const WorkSecond = () => {
    useEffect(() => {
      Aos.init({ duration: 1500 })
    }, [])
    return (
        <section id="product" className={layout.sectionReverse}>
            <div data-aos="fade-right" className={layout.sectionImgReverse}>
                <img src={qr} alt="qr" className="w-[40%] h-[65%] relative z-[5] rounded-tl-100 rounded-br-5" />
        
            </div>

            <div data-aos="fade-right" className={layout.sectionInfo}>
            <div data-aos="zoom-in" className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full darkblue__gradient right-1" />
            <h2 className={styles.heading2}>
              Generate QR <br className="sm:block hidden" /> code to wallet
            </h2>

            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
              After checking in, the user can generate a unique QR code that is linked to their digital wallet on the app.
            </p>
            <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
                <img src={googleSoon} alt="google_play" className="w-[144.17px] h-[43.08px] object-contain cursor-pointer" />
            </div>

          </div>
        </section>
    );
};

export default WorkSecond