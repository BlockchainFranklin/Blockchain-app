import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar, Footer, HomePage, LoginPage, WalletPage, NotFoundPage } from './components';
import styles from "./style";
import PreLoader from "./components/PreLoader"; 
import { metaMask } from './components';
import { MetaMaskProvider } from './components/metaMask'
import Web3 from 'web3'; // Dodaj import Web3 z biblioteki web3
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'

function getLibrary(provider, connector) {
  return new Web3(provider)
}

const App = () => {
  
  return (
    <div className="bg-primary w-full overflow-visible">
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/wallet" element={<WalletPage />} />
          <Route exact path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      </MetaMaskProvider>
      </Web3ReactProvider>


    </div>
  );
};

export default App;
