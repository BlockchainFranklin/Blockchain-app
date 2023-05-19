
## Prerequirements

To deploy the localhost version of app you will need following modules:
* node.js
* Ganache

## Installation 
To deploy the localhost version of app you will need execute following steps:
1. Run Ganache on locacalhost:8545 (different port) and create local blockchain
2. Connect Metamast wallet account to Ganache network and to generated address (by private key)
3. Deploy token ("node deployToken.js")
4. Change the token address in SmartContract.jsx (client) and in cftokenaddress (in this directory) to newly generated
5. Deploy ChainFit contract ("node deploy.js" or for tests "node deployTest.js")
6. Change the address in SmartContract.jsx (client) and in cfaddress (in this directory) to newly generated
7. Connect ChainFit with ChainFitToken ("node setupCFT.js")
8. You can add some random data by executing insertTestData.js file
