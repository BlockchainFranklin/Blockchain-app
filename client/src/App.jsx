import React, { lazy, Suspense, startTransition } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { MetaMaskProvider } from './hooks/metaMask'
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core'

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const WalletLayout = lazy(() => import('./pages/WalletLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TakePhoto = lazy(() => import('./pages/TakePhoto'));
const History = lazy(() => import('./pages/History'));
const AddRate = lazy(() => import('./pages/AddRate'));
const Confirm = lazy(() => import('./pages/Confirm'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const Loading = lazy(() => import('./pages/Loading'));

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
          <Route exact path="/" element={
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          } />
          <Route exact path="/login" element={
            <Suspense fallback={<Loading />}>
              <LoginPage />
            </Suspense>
          } />
          <Route exact path="/wallet" element={
            <Suspense fallback={<Loading />}>
              <WalletLayout />
            </Suspense>
          }>
            <Route path="dashboard" element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="takephoto" element={
              <Suspense fallback={<Loading />}>
                <TakePhoto />
              </Suspense>
            } />
            <Route path="history" element={
              <Suspense fallback={<Loading />}>
                <History />
              </Suspense>
            } />
            <Route path="addrate" element={
              <Suspense fallback={<Loading />}>
                <AddRate />
              </Suspense>
            } />
            <Route path="confirm" element={
              <Suspense fallback={<Loading />}>
                <Confirm />
              </Suspense>
            } />
          </Route>
          <Route exact path="*" element={
            <Suspense fallback={<Loading />}>
              <NotFoundPage />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
      </MetaMaskProvider>
      </Web3ReactProvider>
    </div>
  );
};

export default App;
