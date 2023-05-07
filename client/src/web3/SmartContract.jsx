const walletAddress = window.ethereum.selectedAddress;
const chainfitAddress = '0x67B42df3aF6C120d982bB09B296A6e62f615907F';

const web3 = new Web3('ws://127.0.0.1:8545');
import abi from "./CF_abi.jsx";
import {mapResultFromInt} from '../services/Results.jsx';
const contract = new web3.eth.Contract(abi, chainfitAddress);


export async function getAllGymVisits(){
    try {
        console.log(walletAddress);
        const result = await contract.methods.getVisits(walletAddress).call();

        // GymVisit[]
        const gymVisits = result.map((visit) => {
          const gymVisit = {
            visitId: visit[0],
            user: visit[1],
            visitTime: visit[2],
            hash: visit[3],
            result: visit[4],
            ratesIds: visit[5],
          };
          return gymVisit;
        });

        return gymVisits;
    } 
    catch (error) {
        console.error(error);
        return null;
    }
}


export async function getVisitRates(visitId) {
    try {
      const result = await contract.methods.getVisitRates(visitId).call();
  
      // GymVisitRate[]
      const gymVisitRates = result.map((rate) => {
        const gymVisitRate = {
          visitId: rate[0],
          userRated: rate[1],
          ratingTime: rate[2],
          rate: rate[3],
          rateSource: rate[4],
        };
        return gymVisitRate;
      });
      
      console.log(gymVisitRates);
      return gymVisitRates;
    } catch (error) {
      console.error(error);
      return null;
    }
  }


  export async function checkVisit(visitId) {
    console.log('Checking visit ' + visitId);
    try {
        const result = await contract.methods.checkVisit(visitId).call();
        console.log(result);
        var resultstring = mapResultFromInt(result);
        alert(`Visit ${visitId} verification completed with result: ${resultstring}`);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to check visit with id ${visitId}. Error message: ${error.message}`);
    }
  }