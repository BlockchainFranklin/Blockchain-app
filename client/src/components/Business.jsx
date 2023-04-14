import React, { useEffect } from "react";
import { workFirst } from '../assets'
import styles, { layout } from '../style'
import Aos from "aos";
import "aos/dist/aos.css";




const Business = () => {

  return (
    <section id="clients" className={`${styles.paddingY}     
    ${styles.flexCenter} flex-col relative `}>

    <div data-aos="zoom-in" className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />
    <div className="container">
    <div className="row">
      <div class=" hover ">

          <span></span>
          <h1>Bathrooms</h1>
 
      </div>
      <div class=" hover ">
        <span></span>
        <h1>Bathrooms</h1>
      </div>
      <div class=" hover ">
        <span></span>
        <h1>Bathrooms</h1>
      </div>

      
    </div>
  </div>
    





  </section>
  )
}

export default Business