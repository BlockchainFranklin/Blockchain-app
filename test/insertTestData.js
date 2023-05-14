const Web3 = require('web3');
const fs = require('fs'); // dodana linijka





const addresses = ['0x2c7600859422546a8E06c5e213095a52651CEF58'];
const chainfitAddress = fs.readFileSync('./cfaddress', 'utf8').toString().trim();
let startingVisits = 0;
let insertRates = true;
const web3 = new Web3('http://127.0.0.1:8545'); // adres URL sieci Ganache
console.log(addresses[0]);



const contractAbi = JSON.parse(fs.readFileSync('./CFTest_abi', 'utf8'));
const contract = new web3.eth.Contract(contractAbi, chainfitAddress);

//console.log(contractAbi);

const visitHashes = [];
const visitTestHashes = ['9721c2f3056dd068','4a0c68c497','06852f45ad533b0','baca4a0c68c49721','ahzjy0g9nxqz4e173as2kh','50fvkq26v5y2spvnokuotw','83926555117','vdswqtas5josrguyqg54','4ow0xnsvqo83vgwzod65p9','uaamgmy9s4n3polijkae'];
for (let i = 0; i < 100; i++) {
  visitHashes.push(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  addresses.push(generateRandomEthAddress());
}

function generateRandomEthAddress() {
  //const ethUtil = require('ethereumjs-util');
  const addressWithoutChecksum = '0x1234567890abcdef1234567890abcdef12345678';
  //const addressWithChecksum = ethUtil.toChecksumAddress(addressWithoutChecksum);

  return addressWithoutChecksum;
}





var rate_positive = 0; 
var ratesource_app = 1;



function getEvmTime() {
  const now = Math.floor(Date.now() / 1000);
  const times = [now];
  for (let i = 1; i <= 13; i++) {
    times.push(times[i - 1] - 86400);
  }
  return times;
}

const t = getEvmTime();




function rand(){
	if (Math.random() > 0.15) {
		return 0;
	} else {
		return 1;
	}
}



// define the function that will call the addGymVisit method
async function addGymVisit(user, visitTime, hash) {
  const gasPrice = await web3.eth.getGasPrice();
  const gasEstimate = await contract.methods.addGymVisit(user, visitTime, hash).estimateGas({ from: addresses[0] });
  console.log(gasEstimate);
  const tx = await contract.methods.addGymVisit(user, visitTime, hash).send({
    from: addresses[0],
    gasPrice: gasPrice,
    gas: gasEstimate*3
  });
  console.log('Transaction hash:', tx.transactionHash);
}



// define the function that will call the addGymVisitRate method
async function addGymVisitRate(visitId, userRated, ratingTime, rate, rateSource) {
  const gasPrice = await web3.eth.getGasPrice();
  const gasEstimate = await contract.methods.addGymVisitRate(visitId, userRated, ratingTime, rate, rateSource).estimateGas({ from: addresses[0] });
  console.log(gasEstimate);
  const tx = await contract.methods.addGymVisitRate(visitId, userRated, ratingTime, rate, rateSource).send({
    from: addresses[0],
    gasPrice: gasPrice,
    gas: gasEstimate*3
  });
  console.log('Transaction hash:', tx.transactionHash);
}

/*
for(let i=0; i<10; i++){
	addGymVisit(addresses[i], t[12]-815, visitHashes[i]);
}

for(let i=0; i<10; i++){
	addGymVisit(addresses[i], t[10]+18, visitHashes[i+10]);
}

for(let i=0; i<10; i++){
	addGymVisit(addresses[i], t[7]-6666, visitHashes[i+20]);
}
for(let i=0; i<10; i++){
	addGymVisit(addresses[i], t[4]+586, visitHashes[i+30]);
}
for(let i=0; i<10; i++){
	addGymVisit(addresses[i], t[0]-711, visitTestHashes[i]);
}
*/

let steps = 50*15;
let timeAll = 60*60*24*4;
let timePerStep = Math.round(timeAll/steps);

let time = t[4];
for(let i=0; i<50; i++){
	for(let j=insertRates? 0:1; j<15; j++){
		if(i==j) continue;
		addGymVisitRate(i+startingVisits, addresses[j], time, rand(), rand());
		time += timePerStep;
	}
}
