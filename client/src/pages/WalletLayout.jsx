import styles from "../style";
import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar } from '../components'
import { Navigate, Outlet, useLocation } from "react-router-dom";
import moment from "moment/moment";
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { metaMask } from '../hooks';
import QRCode from 'qrcode.react';

const WalletLayout = () => {

  const [walletAddress, setWalletAddress]=useState(null);
  const [qrCodeValue, setQRCodeValue] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      const { selectedAddress } = window.ethereum;
      if (selectedAddress !== null) {
        setWalletAddress(selectedAddress);
      }
    } else {
      console.log("window.ethereum is not available");
    }
  }, []);

  useEffect(() => {
    if (walletAddress) {
      setQRCodeValue(walletAddress);
    }
  }, [walletAddress]);

  const { pathname } = useLocation()
  return (
    <div className="bg-primary w-full">
      <div className={`sticky top-0 ${styles.paddingX} ${styles.flexCenter} bg-navbar`} style={{ zIndex: 9999, backdropFilter: 'blur(15px)'  }}>
        <div className={`${styles.boxWidth} `}>      
          <Navbar type="navbar2" />
        </div>
      </div>
      <div className="containerWallet">
        <Sidebar />
        {/* making the dashboard as the default route */}
        {pathname === "/wallet" && <Navigate to="/wallet/dashboard" />}
        <div className="dashboardWallet">
          <div className="topBaseGradientsWallet">
            <div className="gradient-first"></div>
            <div className="gradient-second"></div>
            <div className="gradient-third"></div>
          </div>
          <div className="headerWallet text-white font-bold">
            <span>{moment().format("dddd, Do MMM YYYY")}</span>
            <div className="profileWallet">
            {qrCodeValue && (
              <QRCode
                value={qrCodeValue}
                size={60}
                fgColor="#000000"
                bgColor="#ffffff"
                level="L"
                renderAs="svg"
              />
            )}
              <div className="detailsWallet">
                <span>{walletAddress}</span>
              </div>
            </div>
          </div>
          <div className="contentWallet">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WalletLayout
