import React, { useEffect } from "react";
import { contactWithUs, contactPeople } from '../constants';
import CardInfo from './CardInfo'
import styles from '../style';
import Aos from "aos";
import "aos/dist/aos.css";

const ContactUs = () => {
    useEffect(() => {
        Aos.init({ duration: 1500 })
    }, [])    
  
    return (
        <section id="contact" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
          {/*<div data-aos="zoom-in" className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" /> */}  {/* GRADIENT */} 
          <div data-aos="fade-up">
          <div className="flex items-center justify-center">
          <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-yellow text-center" style={{ float: 'left', marginRight: '10px' }}>
            Contact
          </h4>
          <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-violet text-center" style={{ float: 'left' }}>
            with us
          </h4>
          <div style={{ clear: 'both' }}></div>
          </div>
            <br />
            <br />
          </div>

          <div className="container">
            <div className = "row flex">
            {contactPeople.map((card) => (
              <div key={card.id}>
                <CardInfo {...card} />
              </div>
            ))}
            </div>
          </div>
        </section>
  )
}

export default ContactUs