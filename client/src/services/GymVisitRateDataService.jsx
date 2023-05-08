import { getUserVisitRates } from '../web3/SmartContract.jsx';
import { mapResultFromInt } from './Results.jsx';
import { formatTime } from './FormatTime.jsx';

function getRateString(rate) {
  if (rate == 0) {
    return "Positive";
  } else if (rate == 1) {
    return "Negative";
  } else {
    return "Unknown";
  }
}

function getRateSourceString(rateSource) {
  if (rateSource == 0) {
    return "QRCode";
  } else if (rateSource == 1) {
    return "App";
  } else {
    return "Unknown";
  }
}

export async function getGymVisitRatesTableView() {
  const gymVisitRates = await getUserVisitRates(window.ethereum.selectedAddress, 60 * 60 * 24 * 14);
  if (gymVisitRates == null) return [];

  const tableData = gymVisitRates.map(async (gymVisitRate) => {
    return [
      gymVisitRate.visitId.toString(),
      gymVisitRate.userRated.toString(),
      formatTime(gymVisitRate.ratingTime),
      getRateString(gymVisitRate.rate),
      getRateSourceString(gymVisitRate.rateSource)
    ];
  });

  return Promise.all(tableData);
}