import React, { useEffect } from "react";
import { aboutus } from '../constants';
import styles from '../style';
import Aos from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion"

const AboutUs = () => {
  useEffect(() => {
    Aos.init({ offset: 200, duration: 900000, delay: 5000000 })
  }, [])

  return(
  <section id="vision" className={`${styles.flexDiv}}
  `}>    
   
      {/* colored horizontal line */}
      <div data-aos="zoom-in" style={{
        background: 'linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.8) 48%, rgba(255, 255, 255, 0.8) 5%, transparent 100%)',
        height: '4px',
        marginBottom: '10px'
      }}>
        <hr style={{

          opacity: '0.3',
          margin: '0'
        }}/>
      </div>

    <br />

    {aboutus.map((aboutus) =>(
      <div data-aos="fade-up" key={aboutus.id} className={`flex-1`}>
      <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-main text-center">
        Our Vision
      </h4>
      </div>
    ))}

    <br />
    <br />

    {aboutus.map((aboutus) =>(
      <div data-aos="fade-up" key={aboutus.id} className={``}>
      <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-white text-center">
      Welcome to ChainFit, the revolutionary new application that allows you to earn money while you work out at the gym. ChainFit uses blockchain technology to reward users for their physical activity and motivate them to stay active and healthy.

With ChainFit, all you need to do is download the app, connect it to your gym or fitness center, and start logging your workouts. Every time you complete a workout, you will earn ChainFit tokens, which can be redeemed for real-world rewards like gift cards, merchandise, and even cryptocurrency.

ChainFit uses state-of-the-art blockchain technology to ensure that your data is secure and that your rewards are distributed fairly. Plus, the app is easy to use and integrates seamlessly with your existing fitness routine.

So why wait? Download ChainFit today and start earning money while you get fit!
      </p>
      </div>
    ))}
  </section>
  )
}


export default AboutUs