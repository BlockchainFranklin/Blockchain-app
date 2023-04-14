import styles from "../style";
import { Navbar2, Login, Footer } from '../components'
import React, { useState, useContext, useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { MetaMaskProvider } from '../components/metaMask'



const LoginPage = () =>  {

  const currentUrl = window.location.href;  // pobranie aktualnego adresu URL
  const newUrl = currentUrl.replace('/login', '') + '/wallet';

  
  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress === null) {
        console.log("selectedAddress: ", window.ethereum.selectedAddress);
    } else if (window.ethereum && window.ethereum.selectedAddress !== null) {
        console.log("selectedAddress: ", window.ethereum.selectedAddress);
        if (typeof window.ethereum !== "undefined") {
            window.location.href = newUrl; // Przekierowanie na nowy URL
        }
    } else {
        console.log("window.ethereum is not available");
    }
}, []);
  return (
    <div className="bg-primary w-full">
    
    <div className={`sticky top-0 ${styles.paddingX} ${styles.flexCenter} bg-black`} style={{ zIndex: 9999 }}>
      <div className={`${styles.boxWidth} `}>      
        <Navbar2 />
      </div>
    </div>


        <Login />  

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
    <div className={`${styles.boxWidth}`}>
      <Footer />
    </div>
  </div>
  </div>
  
  )
}

export default LoginPage