import React from 'react'
import "../styles/confirmstyles.css";
import { getRandomGymVisitHashToRate, getVisitIdByHash, addRate, checkRated } from '../web3/SmartContract.jsx';

/*let gymVisitsFrom3Days = await getGymVisitsFrom3Days();
console.log('Visit to rate: ' + gymVisitsFrom3Days);*/


//TODO: check 20 rates per 24h
{
var source = 0;
var visitHash = getParameterByName('hash');
var visitId = -1;
var info = '';

if(!visitHash) {
    source = 1;
    const randomPhoto = await getRandomGymVisitHashToRate();
    if(randomPhoto == null) {
        info = 'There is no visit to rate<br>Check it later.';
        alert(`There is no visit to rate. Check it later.`);
    }
    else {
        visitId = randomPhoto[0];
        visitHash = randomPhoto[1];
    }
}
else {
    visitId = await getVisitIdByHash(visitHash);
    console.log(visitId);
    if(visitId == -1) info = 'Invalid link or gym visit time to rate expired.';
    else if(await checkRated(visitId)) info = 'You have rated this visit yet.';
}

var photoSrc = '';
console.log(info); 
if(info == '') {
    console.log(visitId + ' ' + visitHash); 
    const photoPath = "CFT/" + visitHash + ".jpg";
    photoSrc = "http://127.0.0.1:8080/" + photoPath;
}
else{
    alert(info);
}


    

    


// Function to get URL parameter value
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURI(results[2].replace(/\+/g, ' '));
}

//<a onClick={() => handleButtonClick(gymVisit.visitId)} className="btnaccept btnaccept-lg"><span>Check visit</span></a>
}    


const AddRate = () => {

    // Handle clicking the "Yes" button
    async function handleYesButtonClick() {
        if(visitId != -1){
            await addRate(visitId, 0, source);
            window.location.href = 'addrate';
        }
    }

    // Handle clicking the "No" button
    async function handleNoButtonClick() {
        if(visitId != -1){
            await addRate(visitId, 1, source);
            window.location.href = 'addrate';
        }
    }

  return (
    <section id="features" style={{ justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1800px', minHeight: '800px', margin: '0 auto' }}>
        <div class="container">
        <div class="row">
        <div className="dashboardDashboard col-12">
            <div className="dashboardHeadDashboard theme-container">
                <div className="headDashboard" style={{justifyContent: "center"}}>
                <h1 className="font-poppins font-semibold ss:text-[22px] text-[22px] text-white ss:leading-[4vh] leading-[3vh]">Is the photo taken at the gym?</h1>
                </div>
                </div>
            </div>
            
            <div class="col-6 text-center pb-3">
                <button id="yes-button" type="button" onClick={() => handleYesButtonClick()} class="btn btn-success mr-3 w-50" style={{ border: '5px solid green', boxShadow: 'green 2px' }}>Yes</button>
            </div>
            <div class="col-6 text-center pb-3">
                <button id="no-button" type="button" onClick={() => handleNoButtonClick()} class="btn btn-danger w-50" style={{ border: '5px solid red', boxShadow: 'red 2px' }}>No</button>
            </div>
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                    <img id="photo" class="img-fluid w-100" src={photoSrc} alt="Gym photo"/>
                    </div>
                </div>
            </div>
        
        </div>
        </div>
</section>
  );
};

export default AddRate