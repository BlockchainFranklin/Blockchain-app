import React, { useEffect, useState } from 'react';
import { addVisit } from '../web3/SmartContract.jsx';
import { generateAddress } from '../hooks';
import QRCode from 'qrcode.react';

const { selectedAddress } = window.ethereum;
if (selectedAddress !== null) {
} else {
  console.log("window.ethereum is not available");
}

function RealiseContract({ setOpenModal, setFile, readyFile, hash }) {
  const [resultMessage, setResultMessage] = useState('');
  const [imageData, setImageData] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [ad, setAd] = useState('');


  useEffect(() => {
    const handleAddVisit = async () => {
      try {
        //console.log('Ready File:', readyFile);
        let result = await addVisit(hash);

        //let resultSave = await saveFileToCFT(readyFile, hash); // Zapisz plik w folderze CFT

        //console.log('Add Visit Result:', result);
        // Ustawienie odpowiedniego komunikatu w zależności od wyniku
        if (result !== -1) {
          setResultMessage('Visit added!');
          
        } else {
          setResultMessage('There was a problem loading the photo. Make sure you have an internet connection and 8 hours have passed since your last visit');
        }
        // Zamykanie modalu
        // setOpenModal(false);
      } catch (error) {
        console.log('Error:', error);
        setResultMessage('Wystąpił błąd podczas dodawania wizyty.');
      }
    };

    handleAddVisit();
  }, []);

  useEffect(() => {
    const generateVisitString = async () => {
      try {
        const visitString = await generateAddress(selectedAddress, hash, readyFile);
        //console.log(visitString); // Tutaj otrzymasz string
        setAd(visitString);
      } catch (error) {
        console.error(error);
        // Obsłuż błąd, jeśli wystąpi
      }
    };

    const generateImage = async () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const image = new Image();
      //console.log(image);
      image.src = readyFile; 
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        //save file

        const canvasToSave = canvas;
        const dataURLToSave = canvasToSave.toDataURL('image/png');
        const blob = new Blob([dataURLToSave], { type: dataURLToSave.type });

        const formData = new FormData();
        formData.append('image', blob, hash+'.jpg'); 

        fetch('http://localhost:8081/upload', {
          method: 'POST',
          body: formData
        })
        .then(response => response.text())
        .then(result => {
          console.log(result);
        }) 
        .catch(error => {
          console.error('Błąd:', error);
        }); 

        const qrCodeDataUrl = document.querySelector('.qrCodeContainer canvas').toDataURL('image/png');
        const qrCodeImage = new Image();
        qrCodeImage.src = qrCodeDataUrl;
        qrCodeImage.onload = () => {
          context.drawImage(qrCodeImage, 0, 0);
          const dataURL = canvas.toDataURL('image/png');
          setDownloadLink(dataURL);
        };
      }; 
    }; 


    generateImage();
    generateVisitString();
  }, [readyFile, setOpenModal, setFile, ad, downloadLink]);

  //console.log(ad);
  return (
    <div className="modalPhotoBackground">
      {ad ? (
        <div>
          <div className="modalPhotoContainer">
          <h1 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white text-center"> Download your photo and share!</h1>
            <br/>
          {downloadLink && (
            <div className="photoImage">
              <img
                src={downloadLink}
                alt="Uploaded Photo"
                style={{
                  maxWidth: '50vh',
                  maxHeight: '30vh',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          )}

          <br />
          <div className="downloadButtonContainer" style={{ color: "white" }}>
          <button
          className="bg-yellow-300 hover:bg-yellow-400 font-bold py-2 px-4 rounded"
              style={{  color: "black" }}
          onClick={() => {
            setTimeout(() => {
              window.location.reload();
            }, 1);
          }}
        >
          <a
            href={downloadLink}
            download={`${hash}.jpg`}
            style={{ color: "black", textDecoration: "none" }}
          >
            Download Image
          </a>
        </button>
        </div>
          
            <br />
            <h1 className="font-poppins font-semibold xs:text-[20.89px] text-[15.89px] xs:leading-[10.16px] leading-[10.16px] text-white text-center">Your QR code</h1>

            <div className="qrCodeContainer">
              <QRCode value={ad} size={75} /> 
            </div>

            <br/>
            {/*<h4 style={{color: "white", fontSize: "0.6em"}}>Your link to visit: {ad}</h4>*/}


          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
  
}

export default RealiseContract;
