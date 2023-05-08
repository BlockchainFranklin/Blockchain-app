const walletAddress = window.ethereum.selectedAddress;
//const chainfitAddress = '0xE30913e1b0D06c016D09B6824E19bEAB56eDc00D';
const chainfitAddress = '0xe49D4AC3aF97Dbf2b55bf44DF5dAE75277261652';

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

export async function getVisitCount(visitId) {
  try {
    let ret = 0;
    const result = await contract.methods.getVisits(walletAddress).call();
    const gymVisits = result.map((visit) => {
      const gymVisit = {
        visitId: visit[0],
        user: visit[1],
        visitTime: visit[2],
        hash: visit[3],
        result: visit[4],
        ratesIds: visit[5],
      };
      ret++;
    });
    return ret;
    
  } catch (error) {
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
      
      return gymVisitRates;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  export async function getUserVisitRates(address, time) {
    try {
      const result = await contract.methods.getUserVisitRates(address, time).call();
  
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
      
      return gymVisitRates;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  export async function getVisitRatesCount(address, time) {
    try {
      let ret = 0;
      const result = await contract.methods.getUserVisitRates(address, time).call();
  
      // GymVisitRate[]
      const gymVisitRates = result.map((rate) => {
        const gymVisitRate = {
          visitId: rate[0],
          userRated: rate[1],
          ratingTime: rate[2],
          rate: rate[3],
          rateSource: rate[4],
        };
        ret++;
      });
      
      return ret;
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