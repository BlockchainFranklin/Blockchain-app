import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar, Footer, HomePage, LoginPage, Blob } from './components';
import styles from "./style";
import PreLoader from "./components/PreLoader"; 

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/blob" element={<Blob />} />
      </Routes>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
 
  );
};

export default App;
