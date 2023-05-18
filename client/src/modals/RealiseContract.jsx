import React, { useEffect, useState } from 'react';
import { addVisit } from '../web3/SmartContract.jsx';
import { generateAddress } from '../hooks';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

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
        console.log('Ready File:', readyFile);
        let result = await addVisit(hash);
        console.log('Add Visit Result:', result);
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

    const generateVisitString = async () => {
      try {
        const visitString = await generateAddress(selectedAddress, hash, readyFile);
        console.log(visitString); // Tutaj otrzymasz string
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
      console.log(image);
      image.src = readyFile;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
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

    handleAddVisit();
    generateImage();
    generateVisitString();
  }, [readyFile, setOpenModal, setFile, hash, ad, downloadLink]);

  console.log(ad);
  return (
    <div className="modalPhotoBackground">
      {ad ? (
        <div>
          <div className="modalPhotoContainer">
            <h1 style={{color: "white"}}> Download your photo and share!</h1>
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
            <h1 style={{color: "white"}}>Your QR code</h1>

            <div className="qrCodeContainer">
              <QRCode value={ad} size={75} />
            </div>

            <br/>
            <h4 style={{color: "white", fontSize: "0.5em"}}>Your link to visit: {ad}</h4>


          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
  
}

export default RealiseContract;
