import React, { useEffect } from 'react'
import { preLoaderAnim } from '../animations';
import './preloader.css'



const PreLoader = () => {
  
  useEffect(() =>{
    preLoaderAnim()
  },[]);

  return (
    <div className="preloader">
      <div className="texts-container">
        <span>PRACTISE</span>
        <span>PERSIST</span>
        <span>PROFIT</span>
      </div>
    </div>
  )
}
export default PreLoader