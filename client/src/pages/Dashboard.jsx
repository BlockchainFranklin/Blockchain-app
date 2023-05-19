import React from 'react'

import { Statistics } from '../components';
import { cardsData, groupNumber } from '../constants';
import { FaEthereum } from "react-icons/fa";
import { RiExchangeDollarFill } from "react-icons/ri";
import { TbCurrencyCent } from "react-icons/tb";
import { FaWalking } from "react-icons/fa";
import { AiFillLike } from 'react-icons/ai';
import { BiDumbbell } from "react-icons/bi";
import { BsArrowRepeat } from "react-icons/bs";

import { ethBalance, cftBalance, getAllGymVisitCount, getAllGymVisitRatesCount, getVisitCount, getVisitRatesCount } from '../web3/SmartContract.jsx';
import "../styles/dashboard.css";

let ethPrice;
let cftPrice = 0.12;
async function fetchEthereumPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await response.json();
    ethPrice = data.ethereum.usd;
  } catch (error) {
    console.log('Error fetching Ethereum price:', error);
  }
}

await fetchEthereumPrice();

let ethBalanceText = await ethBalance();
ethBalanceText = parseFloat(ethBalanceText/10**18).toFixed(2);

let cftBalanceText = await cftBalance();
cftBalanceText = parseFloat(cftBalanceText/10**18).toFixed(2);

let allGymVisitsText = await getAllGymVisitCount();
let allVisitRatesText = await getAllGymVisitRatesCount();
let yourGymVisitsText = await getVisitCount();
let yourVisitRatesText = await getVisitRatesCount(window.ethereum.selectedAddress, 60*60*24*365*1);

const Dashboard = () => {
  return <section id="features" style={{ justifyContent: 'center', alignItems: 'center', width: '90%', maxWidth: '1800px', minHeight: '800px', margin: '0 auto' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      <div className="absolute z-[1] w-[90%] h-[90%] rounded-full lightblue2__gradient bottom-0" />
    <div class="container">

    <div class="row" >
        <div className="dashboardDashboard col-12">
          <div className="dashboardHeadDashboard theme-container">
            <div className="headDashboard" style={{justifyContent: "center"}}>
              <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]"> History of growth</h1>
            </div>
            </div>
          </div>
        <div className="dashboardDashboard col-12">
          <div className="dashboardHeadDashboard theme-container">
            <div className="cardsDashboard">
              <div className="cardDashboard pl-5">
                <div className="cardHeadDashboard" >
                  <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">ETH tokens</h1>
                </div>
                <div className="cardAmountDashboard" >
                  <FaEthereum size={30}/>
                  <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">{ethBalanceText}</h1>
                </div>
              </div>


              <div className="cardDashboard">
                <div className="cardHeadDashboard">
                  <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">ETH/USDT</h1>
                </div>
                <div className="cardAmountDashboard">
                  <RiExchangeDollarFill size={30}/>
                  <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">{ethPrice}</h1>
                </div>
              </div>

              <div className="cardDashboard pr-5">
                <div className="cardHeadDashboard">
                <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">Balance (ETH)</h1>
                </div>
                <div className="cardAmountDashboard">
                  <FaEthereum size={30}/>
                  <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">{parseFloat(ethBalanceText * ethPrice).toFixed(2)}</h1>
                </div>
              </div>
          </div>
          </div>
      </div>



      <div className="dashboardDashboard col-12">
          <div className="dashboardHeadDashboard theme-container">
            <div className="cardsDashboard">
              <div className="cardDashboard pl-5">
                <div className="cardHeadDashboard">
                  <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">CFT tokens</h1>
                </div>
                <div className="cardAmountDashboard">
                <TbCurrencyCent size={30}/>
                <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">{cftBalanceText}</h1>
                </div>
              </div>


              <div className="cardDashboard">
                <div className="cardHeadDashboard">
                <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">CFT/USDT</h1>
                </div>
                <div className="cardAmountDashboard">
                  <RiExchangeDollarFill size={30}/>
                  <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">{cftPrice}</h1>
                </div>
              </div>

              <div className="cardDashboard pr-5">
                <div className="cardHeadDashboard">
                <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">Balance (CFT)</h1>
                </div>
                <div className="cardAmountDashboard">
                <TbCurrencyCent size={30}/>
                <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">{parseFloat(cftBalanceText * cftPrice).toFixed(2)}</h1>
                </div>
              </div>
          </div>
          </div>
      </div>

      <div className="row pt-5">
        <div className="col-md-3 col-sm-6">
            <div className="counter gray">
                <div className="counter-icon">
                    <i className="fa fa-walking"></i>
                </div>
                <div className="counter-content">
                    <h3 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">Your gym visits</h3>
                    <h1 className="font-poppins font-semibold ss:text-[40px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">{yourGymVisitsText}</h1>
                </div>
            </div>
        </div>
        <div className="col-md-3 col-sm-6">
            <div className="counter gray">
                <div className="counter-icon">
                    <i className="fa "><AiFillLike/></i>
                </div>
                <div className="counter-content">
                    <h3 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">Your rates</h3>
                    <h1 className="font-poppins font-semibold ss:text-[40px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">{yourVisitRatesText}</h1>
                </div>
            </div>
        </div>
        <div className="col-md-3 col-sm-6">
            <div className="counter gray">
                <div className="counter-icon">
                    <i className="fa"><BiDumbbell/></i>
                </div>
                <div className="counter-content">
                    <h3 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">All gym visits</h3>
                    <h1 className="font-poppins font-semibold ss:text-[40px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">{allGymVisitsText}</h1>
                </div>
            </div>
        </div>
        <div className="col-md-3 col-sm-6">
            <div className="counter gray">
                <div className="counter-icon">
                    <i className="fa"><BsArrowRepeat /></i>
                </div>
                <div className="counter-content">
                    <h3 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">All visit rate</h3>
                    <h1 className="font-poppins font-semibold ss:text-[40px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">{allVisitRatesText}</h1>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
  
  </section>
}

export default Dashboard
