import {mapResultFromInt} from '../services/Results.jsx';

const walletAddress = window.ethereum.selectedAddress;
const chainfitAddress = '0x777C981E06b450a51a86213DD0479a946129894D';
const chainfitTokenAddress = '0x1DAb004cE8684cC21608e1497Cd882B21eAaa227';

const web3 = new Web3('ws://127.0.0.1:8545');
import abi from "./CF_abi.jsx";
import abiToken from "./CFT_abi.jsx";

const contract = new web3.eth.Contract(abi, chainfitAddress);
const contractToken = new web3.eth.Contract(abiToken, chainfitTokenAddress);



export async function cftBalance(){
  return await contractToken.methods.balanceOf(walletAddress).call();
}

export async function ethBalance(){
  try {
    const balance = await web3.eth.getBalance(walletAddress);
    return balance;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export async function getAllGymVisitCount(){
  return await contract.methods.getVisitsCount().call();
}

export async function getAllGymVisitRatesCount(){
  return await contract.methods.getVisitRatesCount().call();
}


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

export async function getVisitCount() {
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
      const resultRet = await contract.methods.checkVisit(visitId).call( {from: walletAddress} );
      console.log(resultRet)
      if(resultRet == 1){
        alert(`Visit don't meet the confirm conditions, but it's still in progress`);
      }
      else {
        const result = await contract.methods.checkVisit(visitId).send({ from: walletAddress, gas: 10000000 });
        var resultstring = mapResultFromInt(resultRet);
        alert(`Transaction result: ` + resultstring);
        location.reload();
      }
     };

  checkVisitAndSendTransaction(visitId);
  }



  export async function addRate(visitId, rateResult, rateSource) {
      const result = await contract.methods.addRate(visitId, rateResult, rateSource).send({ from: walletAddress, gas: 4700000 });
      alert(`Rate added`);
  }

  export async function addVisit(hash) {
    console.log(hash);
    console.log(walletAddress);
    try{
      const result = await contract.methods.addVisit(hash).send({ from: walletAddress, gas: 4700000 });
      return result;
    }
      catch (error) {
      //alert(`Visit added`);
      return -1;
    }
  }

  export async function getVisitIdByHash(visitHash){
    const gymVisits = await contract.methods.getVisitsToRate().call({ from: walletAddress });
    console.log(gymVisits);
    for(let i=0; i<gymVisits.length; i++){
      console.log(visitHash);
      console.log(gymVisits[i].hash);
      if(gymVisits[i].hash.localeCompare(visitHash) == 0)
        return gymVisits[i].visitId;
    }
    return -1;
  }

  export async function checkRated(visitId){
    return await contract.methods.checkRated(walletAddress, visitId).call({ from: walletAddress });
  }

  export async function checkOneVisitPer8h(){
    return await contract.methods.checkLastVisitTime().call({ from: walletAddress });
  }

  export async function checkThreeVisitsPerWeek(){
    return await contract.methods.checkWeekVisitLimit().call({ from: walletAddress });
  }


  export async function getRandomGymVisitHashToRate(){
    const gymVisits = await contract.methods.getVisitsToRate().call({ from: walletAddress });
    console.log(gymVisits);
    const checked = new Array(gymVisits.length).fill(false);
    var ret = null;
    for(let i=0; i<gymVisits.length; i++){
        var r = Math.floor(Math.random() * gymVisits.length);
        while(checked[r]) r = (r+1) % gymVisits.length;
        const isRated = await checkRated(gymVisits[r].visitId);
        if(!isRated){
          ret = [gymVisits[r].visitId,gymVisits[r].hash];
          break;
        }
        else
          checked[r] = true;
    }
    console.log(ret);
    return ret;
  }
