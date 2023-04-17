// WalletPage.js
import styles from "../style";
import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from '../components'
import Web3 from 'web3'
import { metaMask } from '../hooks';

import moment from "moment/moment";
import { BiSearch } from "react-icons/bi";
import Sidebar from "../Sidebar/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const WalletPage = () => {

  const { isActive, account, connect, connect_no_refresh } = metaMask();
  const [balance, setBalance] = useState(null); // Stan do przechowywania salda konta
  const [networkId, setNetworkId] = useState(null); // Stan do przechowywania ID sieci
  const [chainId, setChainId] = useState(null); // Stan do przechowywania ID sieci

  // Użyj useEffect do inicjalizacji połączenia z MetaMask przy ładowaniu strony
  useEffect(() => {
    const initMetaMask = async () => {
      try {
        await connect_no_refresh(); // Wywołaj funkcję connect() z hooka useMetaMask, aby zainicjować połączenie z MetaMask
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    };
    initMetaMask();
  }, []); 

  // Użyj useEffect do monitorowania zmiany wartości konta, salda, ID sieci i ID sieci
  useEffect(() => {
    const updateAccountInfo = async () => {
      try {
        await getAccountBalance(); // Pobierz saldo konta
        await getNetworkInfo(); // Pobierz informacje o sieci
      } catch (error) {
        console.error('Error updating account info:', error);
      }
    };
    updateAccountInfo();
  }, [isActive, account]); 

  // Funkcja do pobierania salda konta
  const getAccountBalance = async () => {
    if (isActive && account) {
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(account);
      setBalance(web3.utils.fromWei(balance, 'ether')); // Przetwórz saldo z wei na ether i ustaw w stanie
    }
  }

  // Funkcja do pobierania informacji o sieci
  const getNetworkInfo = async () => {
    if (isActive) {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      setNetworkId(networkId);
      const chainId = await web3.eth.getChainId(); // Pobierz ID sieci
      setChainId(chainId);
    }
  }
  return (
    <div className="bg-primary w-full">


    <style>
    {`
    .container {
      display: flex;
    }
    
    .dashboard {
      position: relative;
      width: 100%;
      z-index: 0;
    }
    
    .topBaseGradients {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 20rem;
      overflow: hidden;
      z-index: -1;
    }
    
    .topBaseGradients>:nth-child(2)
    {
        left: 40%;
    }
    .topBaseGradients>:nth-child(3)
    {
        right: 0;
    }
    .header{
        display: flex;
        padding: 2rem 4rem;
        align-items: center;
        justify-content: space-between;
    }
    .header>:nth-child(1)
    {
        font-size: 1.2rem;
    }
    .searchBar{
        background-color: rgba(255, 255, 255, 0.496);
        width: 30%;
        max-width: 25rem;
        padding: 1rem 1rem;
        border-radius: 8px;
        height: 2rem;
        display: flex;
        align-items: center;
        border: 2px solid rgb(63, 63, 63);
        justify-content: center;
        gap: 8px;
    }
    
    .searchBar>input{
        background: transparent;
        color: white;
        outline: none;
        border: none;
        padding: 0;width: 100%;
    }
    .profile{
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
    }
    
    .profile>img{
        height: 50px;
        width: 50px;
    }
    .details{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .details>:nth-child(1)
    {
        font-size: 1rem;
        font-weight: bold;
    }
    .content{
        margin: auto;
        display: flex;
        height: 100%;
        /* align-items: center; */
        /* uncomment the aic, and make mt -4rem */
        margin-top: 4rem;
    }
    .content>div{
        width: 100%;
        min-width: 75vh
    }
    
    `}
    </style>













      <div className={`sticky top-0 ${styles.paddingX} ${styles.flexCenter} bg-black`} style={{ zIndex: 9999 }}>
        <div className={`${styles.boxWidth} `}>      
          <Navbar type="navbar2" />
        </div>
      </div>

      

      <div className={css.container}>
      <Sidebar />


      {/* making the dashboard as the default route */}
      {pathname === "/" && <Navigate to="/dashboard" />}


      <div className={css.dashboard}>
        <div className={css.topBaseGradients}>
          <div className="gradient-red"></div>
          <div className="gradient-orange"></div>
          <div className="gradient-blue"></div>
        </div>

        <div className={css.header}>

          <span>{moment().format("dddd, Do MMM YYYY")}</span>

          <div className={css.searchBar}>
            <BiSearch size={20} />
            <input type="text" placeholder="Search" />
          </div>

          <div className={css.profile}>
            <img src="./profile.png" alt="person image" />
            <div className={css.details}>
              <span>Denis Steven</span>
              <span>devissteven@gmail.com</span>
            </div>
          </div>


        </div>


        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>


      {/*
      <div className={` center`}>     
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px]
          text-white ss:leading-[100px] leading-[75px]">
            Your wallet information <br className="sm:block hidden" /> {" "} 
            <div className="mt-2 mb-2 text-white ss:text-[22px] text-[2px]">
            {isActive ? (
              <div>
                <div>Connected Account: {account}</div>
                <div>Balance: {balance} ETH</div>
                <div>Network ID: {networkId}</div>
                <div>Chain Name: {chainId}</div>
              </div>
            ) : (
              <div>Not connected to MetaMask</div>
            )}
          </div>
          </h1>   
        </div>
      </div>
      */}

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default WalletPage
