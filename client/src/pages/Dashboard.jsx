import React from 'react'
import { Statistics } from '../components';
import { cardsData, groupNumber } from '../constants';

import { ethBalance, cftBalance } from '../web3/SmartContract.jsx';


let ethBalanceText = await ethBalance();
ethBalanceText = parseFloat(ethBalanceText/10**18).toFixed(2);

let cftBalanceText = await cftBalance();
cftBalanceText = parseFloat(cftBalanceText/10**18).toFixed(2);

const Dashboard = () => {
  return <div className="containerDashboard">
    {/* left side */}
    <div className="dashboardDashboard">
      <div className="dashboardHeadDashboard theme-container">
        <div className="headDashboard">
          <h6>Dashboard</h6>
          <div className="durationButtonDashboard">
            <select>
              <option value="">1 week</option>
              <option value="">1 month</option>
              <option value="">1 year</option>
            </select>
          </div>
        </div>
        <div className="cardsDashboard">
        {cardsData.map((card, index)=> (
          <div className="cardDashboard" key={index}>
            <div className="cardHeadDashboard">
              <span>ETH</span>
              <span></span>
            </div>
            <div className="cardAmountDashboard">
              <span>$</span>
              <span>{ethBalanceText}</span>
            </div>
          </div>
        ))}
      </div>
      </div>


      <div className="dashboardHeadDashboard theme-container">
        <div className="headDashboard">
          <h6>Dashboard</h6>
          <div className="durationButtonDashboard">
            <select>
              <option value="">1 week</option>
              <option value="">1 month</option>
              <option value="">1 year</option>
            </select>
          </div>
        </div>
        <div className="cardsDashboard">
        {cardsData.map((card, index)=> (
          <div className="cardDashboard" key={index}>
            <div className="cardHeadDashboard">
              <span>CFT</span>
              <span></span>
            </div>
            <div className="cardAmountDashboard">
              <span>$</span>
              <span>{cftBalanceText}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
      <Statistics/>
      <Statistics/>
      <Statistics/>
      <Statistics/>
    </div>
  </div>
}

export default Dashboard