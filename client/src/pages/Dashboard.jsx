import React from 'react'

import { Statistics } from '../components';
import { cardsData, groupNumber } from '../constants';

import { ethBalance, cftBalance, getAllGymVisitCount, getAllGymVisitRatesCount, getVisitCount, getVisitRatesCount } from '../web3/SmartContract.jsx';
import "../styles/dashboard.css";

let ethPrice;
let cftPrice = 0.12;
async function fetchEthereumPrice() {
  try {
    //const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    //const data = await response.json();
    //ethPrice = data.ethereum.usd;
  } catch (error) {
    console.log('Error fetching Ethereum price:', error);
  }
}

await fetchEthereumPrice();

//let ethBalanceText = await ethBalance();
//ethBalanceText = parseFloat(ethBalanceText/10**18).toFixed(2);

//let cftBalanceText = await cftBalance();
//cftBalanceText = parseFloat(cftBalanceText/10**18).toFixed(2);

//let allGymVisitsText = await getAllGymVisitCount();
//let allVisitRatesText = await getAllGymVisitRatesCount();
//let yourGymVisitsText = await getVisitCount();
//let yourVisitRatesText = await getVisitRatesCount(window.ethereum.selectedAddress, 60*60*24*365*1);


let ethBalanceText = 0;
let cftBalanceText = 0;
let allGymVisitsText = 0;
let allVisitRatesText = 0;
let yourGymVisitsText = 0;
let yourVisitRatesText = 0;

const Dashboard = () => {
  return <section id="features" style={{ justifyContent: 'center', alignItems: 'center', width: '90%', maxWidth: '1800px', minHeight: '800px', margin: '0 auto' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      <div class="container">
    <div class="row">
        <div className="dashboardDashboard col-12">
          <div className="dashboardHeadDashboard theme-container">
            <div className="headDashboard">
              <h6>Dashboard</h6>
            </div>
            </div>
          </div>

        <div className="dashboardDashboard col-12">
          <div className="dashboardHeadDashboard theme-container">
            <div className="cardsDashboard">
              <div className="cardDashboard pl-5">
                <div className="cardHeadDashboard">
                  <span>ETH tokens</span>
                  <span></span>
                </div>
                <div className="cardAmountDashboard">
                  <span>x</span>
                  <span>{ethBalanceText}</span>
                </div>
              </div>


              <div className="cardDashboard">
                <div className="cardHeadDashboard">
                  <span>ETH/USDT</span>
                  <span></span>
                </div>
                <div className="cardAmountDashboard">
                  <span>$</span>
                  <span>{ethPrice}</span>
                </div>
              </div>

              <div className="cardDashboard pr-5">
                <div className="cardHeadDashboard">
                  <span>Balance (ETH)</span>
                  <span></span>
                </div>
                <div className="cardAmountDashboard">
                  <span>$</span>
                  <span>{parseFloat(ethBalanceText * ethPrice).toFixed(2)}</span>
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
                  <span>CFT tokens</span>
                  <span></span>
                </div>
                <div className="cardAmountDashboard">
                  <span>x</span>
                  <span>{cftBalanceText}</span>
                </div>
              </div>


              <div className="cardDashboard">
                <div className="cardHeadDashboard">
                  <span>CFT/USDT</span>
                  <span></span>
                </div>
                <div className="cardAmountDashboard">
                  <span>$</span>
                  <span>{cftPrice}</span>
                </div>
              </div>

              <div className="cardDashboard pr-5">
                <div className="cardHeadDashboard">
                  <span>Balance (CFT)</span>
                  <span></span>
                </div>
                <div className="cardAmountDashboard">
                  <span>$</span>
                  <span>{parseFloat(cftBalanceText * cftPrice).toFixed(2)}</span>
                </div>
              </div>
          </div>
          </div>
      </div>


      
      
      <div class="row pt-5">
        <div class="col-md-3 col-sm-6">
            <div class="counter gray">
                <div class="counter-icon">
                    <i class="fa fa-user"></i>
                </div>
                <div class="counter-content">
                    <h3>Your gym visits</h3>
                    <span class="counter-value">{yourGymVisitsText}</span>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6">
            <div class="counter gray">
                <div class="counter-icon">
                    <i class="fa fa-user"></i>
                </div>
                <div class="counter-content">
                    <h3>Your rates</h3>
                    <span class="counter-value">{yourVisitRatesText}</span>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6">
            <div class="counter gray">
                <div class="counter-icon">
                    <i class="fa fa-globe"></i>
                </div>
                <div class="counter-content">
                    <h3>All gym visits</h3>
                    <span class="counter-value">{allGymVisitsText}</span>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6">
            <div class="counter gray">
                <div class="counter-icon">
                    <i class="fa fa-globe"></i>
                </div>
                <div class="counter-content">
                    <h3>All visit rate</h3>
                    <span class="counter-value">{allVisitRatesText}</span>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
  
  </section>
}

export default Dashboard