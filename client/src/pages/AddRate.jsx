import React from 'react'
import "../styles/confirmstyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGymVisitRatesTableView } from '../services/GymVisitRateDataService.jsx';
import { getRandomPhotoToRate, getVisitIdByHash } from '../web3/SmartContract.jsx';
import { useState } from 'react';

/*let gymVisitsFrom3Days = await getGymVisitsFrom3Days();
console.log('Visit to rate: ' + gymVisitsFrom3Days);*/


//TODO: check 20 rates per 24h

var source = 0;
var visitHash = getParameterByName('visitId');
var visitId = -1;

if(!visitHash) {
    source = 1;
    const randomPhoto = getRandomPhotoToRate();
    visitHash = randomPhoto[0];
    visitId = randomPhoto[1];
}
else {
    visitId = getVisitIdByHash(visitHash);
}



const photoSrc = "./CFT" + visitHash + ".jpg";


    
// Handle clicking the "Yes" button
async function handleYesButtonClick() {
    await contract.methods.addRate(visitId, 0, rateSource).send({ from: accounts[0] });
    alert("Rate added successfully");
    window.location.href = 'rate.html';
}

// Handle clicking the "No" button
async function handleNoButtonClick() {
    await contract.methods.addRate(visitId, 1, rateSource).send({ from: accounts[0] });
    alert("Rate added successfully");
    window.location.href = 'rate.html';
}
    


// Function to get URL parameter value
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
    

const History = () => {

  return (
    <section id="features" style={{ justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1800px', minHeight: '800px', margin: '0 auto' }}>
        <div class="container">
        <div class="row">
            <div class="col-12 pb-3"><h1 class="text-center">Is the photo taken at the gym?</h1></div>
            <div class="col-6 text-center pb-3">
                <button id="yes-button" type="button" onClick={() => handleYesButtonClick()} class="btn btn-success mr-3 w-50">Yes</button>
            </div>
            <div class="col-6 text-center pb-3">
                <button id="no-button" type="button" onClick={() => handleNoButtonClick()} class="btn btn-danger w-50">No</button>
            </div>
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                    <img id="photo" class="img-fluid" src={photoSrc} alt="Gym photo"/>
                    </div>
                </div>
            </div>
            </div>
        </div>
</section>
  );
};

export default History