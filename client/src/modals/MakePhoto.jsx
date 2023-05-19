import React, { useState, useRef, useEffect } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import Webcam from "react-webcam";
import { SHA256, enc } from "crypto-js";
import { RealiseContract } from "../modals";
import { addVisit } from '../web3/SmartContract.jsx';

function MakePhoto({ setOpenModal }) {
  const [modalOpen2, setModalOpen] = useState(false);
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [readyFile, setFile] = useState(null);
  const [isCameraLoaded, setIsCameraLoaded] = useState(false);
  const [hash, setHash] = useState(null);
  
  
  const { selectedAddress } = window.ethereum;
  if (selectedAddress !== null) {}
  else {
    console.log("window.ethereum is not available");
  }

  useEffect(() => {
    // Kod efektu
  }, []); // Pusta tablica zależności
  

  useEffect(() => {
    setIsCameraLoaded(true);
    if (webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
    }
  }, []);

  const capture = () => {
    if (webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const img = imageSrc.split(",")[1]; // Remove data:image/jpeg;base64, from the imageSrc
        const hash = SHA256(img).toString(enc.Base64);
        const fileName = `${hash}.jpg`; // Generate file name using the hash
        const file = new File([img], fileName, { type: "image/jpg" }); // Create file object with the hash as name
        const reader = new FileReader();
        reader.onloadend = () => {
          const blobURL = reader.result;
          const hash = SHA256(img).toString(enc.Base64);
          setHash(hash);
          localStorage.setItem("photo", blobURL);
          //localStorage.setItem("latitude", latitude);
          //localStorage.setItem("longitude", longitude);
          //console.log("File name:", file.name);
          //console.log("File type:", file.type);
          //console.log("File size:", file.size, "bytes");
          //console.log("Blob URL:", blobURL);
          //console.log("Hash", hash);
        };
        reader.readAsDataURL(file);
        setFile(file);
        //console.log("File", file);
      });
    }
  };

  return (
    <div>
    <div className="modalPhotoBackground" >
      <div className="modalPhotoContainer">
      <div className="titlePhotoCloseBtn" style={{height: "50px"}}>
      <button 
            onClick={() => {
              setOpenModal(false);
            }}
          >
          <BsArrowLeftCircleFill  size={50} style={{fill: "white"}}/>
          </button>
        </div>
        <div className="title" style={{color: "white", fontSize: "1.0em"}}>
        <h1 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-white text-center">Make photo</h1>
        </div>
        <div className="bodyPhotoModal">
          <div className="iconBtnWrapper">
          <div className="cameraView" style={{style:"flex"}}>
          {!imageSrc ? (
            <div >
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  style={{ width: "auto", height: "40vh" }}
                />

            </div>
          ) : (
            <img src={imageSrc} alt="captured" />
          )}
          </div>
          {imageSrc ? (
            <div>
              <div className="buttonGroup">
                <button className="btnWrapper3 font-poppins font-semibold" onClick={() => setImageSrc(null)}>
                  Make another
                </button>
                {!modalOpen2 && (
                  <button className="btnWrapper3 font-poppins font-semibold" onClick={() => setModalOpen(true)}>
                    It's OK!
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <button className="btnWrapper3 font-poppins font-semibold" onClick={capture}>
                Make photo
              </button>
            </div>
          )}
          
          {modalOpen2 && (
            <div>
              <RealiseContract
                setOpenModal={setModalOpen}
                setFile={setFile}
                readyFile={imageSrc}
                hash={hash}
              />
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
export default MakePhoto;