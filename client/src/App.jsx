import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MetaMaskProvider } from './hooks/metaMask'
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core'
import { HomePage, 
         LoginPage, 
         WalletLayout, 
         NotFoundPage, 
         Dashboard, 
         TakePhoto, 
         History,
         AddRate,
         Confirm 
        } from './pages';

function getLibrary(provider) {
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
          <Route exact path="/wallet" element={<WalletLayout />} >
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="takephoto" element={<TakePhoto/>}/>
            <Route path="history" element={<History/>}/>
            <Route path="addrate" element={<AddRate/>}/>
            <Route path="confirm" element={<Confirm/>}/>
          </Route>
          <Route exact path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      </MetaMaskProvider>
      </Web3ReactProvider>
    </div>
  );
};

export default App;
