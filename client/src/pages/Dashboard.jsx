import React from 'react'
import { Statistics } from '../components';
import { cardsData, groupNumber } from '../constants';

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
              <span>{card.title}</span>
              <span>+{card.change}</span>
            </div>
            <div className="cardAmountDashboard">
              <span>$</span>
              <span>{groupNumber(card.amount)}</span>
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