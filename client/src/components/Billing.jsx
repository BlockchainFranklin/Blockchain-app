import React from 'react'
import Aos from "aos";
import "aos/dist/aos.css";

import { motion, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";

import { useEffect } from "react";



const Billing = () => {
  return (
    <div class="flex justify-center items-center h-center">
      <div class=" box">
        <span></span>
      </div>
      <div class="hover text-white">Hover Me</div>
    </div>
  )
}


export default Billing