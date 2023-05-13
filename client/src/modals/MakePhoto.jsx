import React, { useState, useRef, useEffect } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import Webcam from "react-webcam";
import { SHA256, enc } from "crypto-js";
import { RealiseContract } from "../modals";
import { BounceLoader } from "react-spinners";

function MakePhoto({ setOpenModal }) {
  const [modalOpen, setModalOpen] = useState(false);
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [readyFile, setFile] = useState(null);
  const [isCameraLoaded, setIsCameraLoaded] = useState(false);
  
  useEffect(() => {
    setIsCameraLoaded(true);
    if (webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
    }
  }, [webcamRef]);
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
          localStorage.setItem("photo", blobURL);
          localStorage.setItem("latitude", latitude);
          localStorage.setItem("longitude", longitude);
          console.log("File name:", file.name);
          console.log("File type:", file.type);
          console.log("File size:", file.size, "bytes");
          console.log("Blob URL:", blobURL);
          console.log("Hash", hash);
        };
        reader.readAsDataURL(file);
        setFile(file);
        console.log("File", file);
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
          <h1>Make photo</h1>
        </div>
        <div className="bodyPhotoModal">
          <div className="iconBtnWrapper">
          <div className="cameraView" style={{style:"flex"}}>
          {!imageSrc ? (
            <div className="spinner">
              {isCameraLoaded ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  style={{ width: "auto", height: "40vh" }}
                />
              ) : (
                <BounceLoader size={80} color={"#123abc"} loading={true} />
              )}
            </div>
          ) : (
            <img src={imageSrc} alt="captured" />
          )}
          </div>
          {imageSrc ? (
            <div>
              <button className="btnWrapper3" onClick={() => setImageSrc(null)}>
                Make another
              </button>
              <button className="btnWrapper3" onClick={() => {
                setModalOpen(true);}} >
                It's OK!
              </button>
              {modalOpen && <RealiseContract setOpenModal={setModalOpen} setFile={readyFile} />}
            </div>
          ) : (
            <div>
              <button className="btnWrapper3" onClick={capture}>
                Make photo
              </button>
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