const walletAddress = window.ethereum.selectedAddress;
const chainfitAddress = '0x7EFE34B0fb891b6CeC47493696716cb817D21341';
//const chainfitAddress = '0x034F4AfeC9bd127Cf6f7B6C5A56E7ab20d465d0a';

const web3 = new Web3('ws://127.0.0.1:8545');
import abi from "./CF_abi.jsx";
import {mapResultFromInt} from '../services/Results.jsx';
const contract = new web3.eth.Contract(abi, chainfitAddress);



export async function getAllGymVisits(){
    try {
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

    const checkVisitAndSendTransaction = async (visitId) => {
      const accounts = await web3.eth.getAccounts();
      const resultRet = await contract.methods.checkVisit(visitId).call();
      if(resultRet == 1){
        alert(`Visit don't meet the confirm conditions, but it's still in progress`);
      }
      else {
        const result = await contract.methods.checkVisit(visitId).send({ from: accounts[0] });
        var resultstring = mapResultFromInt(result);
        alert(`Transaction result: ` + resultstring);
        location.reload();
      }
     };

  checkVisitAndSendTransaction(visitId);
  }



  export async function addRate(visitId, rateResult) {

    const checkVisitAndSendTransaction = async (visitId) => {
      const accounts = await web3.eth.getAccounts();
      const resultRet = await contract.methods.checkVisit(visitId).call();
      if(resultRet == 1){
        alert(`Visit don't meet the confirm conditions, but it's still in progress`);
      }
      else {
        const result = await contract.methods.checkVisit(visitId).send({ from: accounts[0] });
        var resultstring = mapResultFromInt(result);
        alert(`Transaction result: ` + resultstring);
        location.reload();
      }
     };

  checkVisitAndSendTransaction(visitId);
  }


  export async function getRandomPhotoToRate(){
    TODO
  }

  export async function getVisitIdByHash(visitHash){
    TODO
  }


  export async function getGymVisitsFrom3Days(){
    const step = 20;
    const now = Math.floor(Date.now() / 1000);
    var countAll = await contract.methods.getVisitsCount().call();
    var idTo = countAll -1;
    var idFrom = countAll - step;
    if(idFrom < 0) idFrom == 0;
    var visitToRate = -1;
    var lastVisitTime = now;
    while(visitToRate == -1 && idFrom > 0 && now - 3 * 24 * 3600 < lastVisitTime){
      console.log(idFrom + ' ' + idTo);
      const gymVisits = await contract.methods.getVisits(idFrom, idTo).call();
      const checked = new Array(step).fill(false);
      for(let i=0; i<idTo-idFrom; i++){
        var r = Math.floor(Math.random() * (idTo-idFrom));
        var r1 = r;
        while(checked[r++%(idTo-idFrom)] && r != r1);
        if(r == r1) break;
        const gymVisit = gymVisits[idFrom + r];
        const isRated = await contract.methods.checkRated(walletAddress, idFrom + r).call();
        console.log(gymVisits + ' ' + r);
        if(!isRated) visitToRate = gymVisit.hash;
      }
      idTo -= step;
      idFrom -= step;
    }
    return visitToRate;
  }

