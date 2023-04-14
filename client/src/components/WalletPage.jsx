// WalletPage.js
import styles from "../style";
import { Navbar3, Login, Footer } from '../components'
import React, { useState, useContext, useEffect } from 'react';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { metaMask } from '../components';
import { MetaMaskProvider } from '../components/metaMask'


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
      <div className={`sticky top-0 ${styles.paddingX} ${styles.flexCenter} bg-black`} style={{ zIndex: 9999 }}>
        <div className={`${styles.boxWidth} `}>      
              <Navbar3 />  
        </div>
      </div>

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



      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default WalletPage
