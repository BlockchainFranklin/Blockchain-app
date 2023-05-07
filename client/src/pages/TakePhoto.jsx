import React, { useEffect } from "react";
import styles from '../style';
import { keyFeaturesText } from '../constants';
import { SiPhotobucket } from "react-icons/si";
import { Link } from 'react-router-dom';
import { blockchain, coin, dumbbells } from "../assets";
import Aos from "aos";
import "aos/dist/aos.css";

const TakePhoto = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])


  return (
    <section id="features" className="sm:py-0 py-0 px-10 flex justify-center items-center flex-col relative" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* <div data-aos="zoom-in" className="absolute z-[0] w-[60%] h-[100%]  rounded-full lightblue__gradient bottom-40" /> */}
        <h2 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-main text-center">
          Make progress! <br />
          Load photo
          <br className="sm:block hidden" />
        </h2>
        <br />
        <div className="relative light">
        <SiPhotobucket size={200} style={{ fill: "white" }} />
        <div
          className="absolute z-10 w-full h-full rounded-full yellow__gradient"
          style={{ top: '-0px', left: '-0px' }}
          />
        </div>
        <div className="mx-10 py-10">
          <Link to="/login">
            <button className="bg-yellow-400 hover:bg-yellow-400 text-white font-bold px-20 rounded" style={{ zIndex: 100, height: '75px' }}>
              Let load photo!
            </button>
          </Link>
          </div>

        <div style={{color: "white", fontFamily: 'Bruno Ace SC', fontSize: '2em', fontWeight: 'bold'}}>
          Motivate text
        </div>





      <div className="w-full pt-160 mt-6 container" style={{paddingTop: '15vh'}}>
        <div className="row">
          <div data-aos="fade-right" data-aos-delay="100" className="box2 box2-first">
            <img src={blockchain} alt="blockchain"/>
            <h2>Blockchain system</h2>
          </div>
          <div data-aos="fade-right" data-aos-delay="200" className="box2 box2-second" >
            <img src={dumbbells} alt="dumbbells"/>
            <h2>Example text</h2>
          </div>

          <div data-aos="fade-right" data-aos-delay="300" className="box2 box2-third" >
            <img src={coin} alt="dumbbells"/>
            <h2>Example text</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakePhoto