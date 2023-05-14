const Web3 = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545'); // adres URL sieci Ganache

const contractAbi = JSON.parse(fs.readFileSync('./CF_abi', 'utf8'));
const contractBytecode = fs.readFileSync('./CF_bytecode', 'utf8').toString().trim();

const contract = new web3.eth.Contract(contractAbi);
const arg1 = fs.readFileSync('./cftokenaddress', 'utf8').toString().trim();

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await contract.deploy({
        data: contractBytecode,
        arguments: [arg1]
    }).send({
		from: accounts[0],
		gas: 4700000,
  });
  console.log('Contract deployed to address:', result.options.address);
}

deploy();