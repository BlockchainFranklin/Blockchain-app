import styles from "../style";
import { Navbar, Login, Footer } from '../components'
import { enterLoginPage } from "../hooks";
import React from 'react';

const LoginPage = () =>  {

  enterLoginPage();

  return (
    <div className="bg-primary w-full">
      <div className={`sticky top-0 ${styles.paddingX} ${styles.flexCenter} bg-navbar`} style={{ zIndex: 9999 }}>
        <div className={`${styles.boxWidth} `}>      
          <Navbar type="navbar2" />
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