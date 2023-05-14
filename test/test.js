async function a(){
	const Web3 = require('web3');
	const fs = require('fs'); // dodana linijka
	const web3 = new Web3('http://127.0.0.1:8545'); // adres URL sieci Ganache
	
	const chainfitAddress = fs.readFileSync('./cfaddress', 'utf8').toString().trim();
	const chainfitTokenAddress = fs.readFileSync('./cftokenaddress', 'utf8').toString().trim();
	const contractAbi = JSON.parse(fs.readFileSync('./CFTest_abi', 'utf8'));
	
	const contract = new web3.eth.Contract(contractAbi, chainfitAddress);
	
	
	try {
		const accounts = await web3.eth.getAccounts();
		const result = await contract.methods.checkRequiredUserRatesToReward().call( {from: accounts[0] } );
		console.log(result);
		console.log('Success');
	} 
	catch (error) {
		console.error(error);
		return null;
	}
}
a();