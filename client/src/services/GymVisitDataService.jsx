import {getAllGymVisits, getVisitRates, checkVisit} from '../web3/SmartContract.jsx';
import {mapResultFromInt} from './Results.jsx';

export async function getGymVisitsTableView(){
  const gymVisits = await getAllGymVisits();
  if(gymVisits == null) return [];
  
  const tableData = gymVisits.map(async (gymVisit) => {
    const getRatesTextValue = await getRatesText(gymVisit.visitId);
    const getRatesPercentValue = await getRatesPercent(gymVisit.visitId);
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
  if (gymVisit.result === "Positive") {
    return 'Reward received';
  } else if (!gymVisit.result === "InProgress") {
    return 'Negative verification';
  } else {
    return <a onClick={() => handleButtonClick(gymVisit.visitId)} className="btnaccept btnaccept-lg"><span>Check visit</span></a>;
  }
}


async function handleButtonClick(visitId){
  checkVisit(visitId);
}


export async function getRatesText(visitId){
    var rateData = await getRatesData(visitId);
    const { positiveQR, positiveApp, negativeQR, negativeApp } = rateData;

    const sumAll = positiveQR + positiveApp + negativeQR + negativeApp;
    const sumQR = positiveQR + negativeQR;
    const sumApp = positiveApp + negativeApp;

    const resultString = `${sumAll} (${sumApp} / ${sumQR})`;
    return resultString;
}

export async function getRatesPercent(visitId){
    var rateData = await getRatesData(visitId);
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
      if (rate.rate === "Positive") {
        if (rate.rateSource === "QRCode") {
          positiveQR++;
        } else if (rate.rateSource === "App") {
          positiveApp++;
        }
      } else if (rate.rate === "Negative") {
        if (rate.rateSource === "QRCode") {
          negativeQR++;
        } else if (rate.rateSource === "App") {
          negativeApp++;
        }
      }
    });

    return { positiveQR, positiveApp, negativeQR, negativeApp };
}



function formatTime(timeInSeconds) {
    const timeInMilliseconds = timeInSeconds * 1000;
    const date = new Date(timeInMilliseconds);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}