import {getAllGymVisits, getVisitRates, checkVisit} from '../web3/SmartContract.jsx';
import {mapResultFromInt} from './Results.jsx';
import {formatTime} from './FormatTime.jsx';

export async function getGymVisitsTableView(){
  const gymVisits = await getAllGymVisits();
  if(gymVisits == null) return [];
  
  const tableData = gymVisits.map(async (gymVisit) => {
    var rateData = await getRatesData(gymVisit.visitId);
    const getRatesTextValue = await getRatesText(rateData);
    const getRatesPercentValue = await getRatesPercent(rateData);
    return [
      gymVisit.visitId.toString(),
      formatTime(gymVisit.visitTime),
      getRatesTextValue,
      getRatesPercentValue,
      mapResultFromInt(gymVisit.result),
      setButtonVisibility(gymVisit)
    ];
  });

  return Promise.all(tableData);
}

function setButtonVisibility(gymVisit) {
  if (gymVisit.result == 0) {
    return 'Reward received';
  } else if (gymVisit.result != 1) {
    return 'Negative verification';
  } else {
    return <a onClick={() => handleButtonClick(gymVisit.visitId)} className="btnaccept btnaccept-lg"><span>Check visit</span></a>;
  }
}


async function handleButtonClick(visitId){
  checkVisit(visitId);
}


export async function getRatesText(rateData){
    const { positiveQR, positiveApp, negativeQR, negativeApp } = rateData;

    const sumAll = positiveQR + positiveApp + negativeQR + negativeApp;
    const sumQR = positiveQR + negativeQR;
    const sumApp = positiveApp + negativeApp;

    const resultString = `${sumAll} (${sumApp} / ${sumQR})`;
    return resultString;
}

export async function getRatesPercent(rateData){
    const { positiveQR, positiveApp, negativeQR, negativeApp } = rateData;
    const positiveSum = positiveQR + positiveApp;
    const negativeSum = negativeQR + negativeApp;
    const totalSum = positiveSum + negativeSum;
    const positivePercentage = (positiveSum / totalSum) * 100;
    return positivePercentage.toFixed(2);
}



async function getRatesData(visitId){
    var gymVisitRates = await getVisitRates(visitId);
    let positiveQR = 0;
    let positiveApp = 0;
    let negativeQR = 0;
    let negativeApp = 0;
    // iterujemy po tabeli ocen i zliczamy ilość ocen
    gymVisitRates.forEach((rate) => {
      if (rate.rate == 0) {
        if (rate.rateSource == 0) {
          positiveQR++;
        } else if (rate.rateSource == 1) {
          positiveApp++;
        }
      } else if (rate.rate == 1) {
        if (rate.rateSource == 0) {
          negativeQR++;
        } else if (rate.rateSource == 1) {
          negativeApp++;
        }
      }
    });

    return { positiveQR, positiveApp, negativeQR, negativeApp };
}

