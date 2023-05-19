import React, { useState } from "react";
import { RiGalleryFill } from "react-icons/ri";
import { TbPhotoSensor2 } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MakePhoto, RealiseContract }  from '../modals';
import { SHA256, enc } from "crypto-js";

function LoadPhoto({ setOpenModal }) {
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [hash, setHash] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  
  const handleLoadFromGalleryClick = () => {
    setShowImagePicker(true);
  };

  const inputRef = React.useRef(null);
  const handleButtonClick = () => {
    inputRef.current.click();
  };
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
  
    //console.log(selectedFile);
    //const img = selectedFile.split(",")[1];
    const hash = SHA256(selectedFile).toString(enc.Base64);
    setHash(hash);
    //console.log(hash);

    // Tworzenie obiektu FileReader
    const reader = new FileReader();


    // Ustawienie funkcji obsługi zdarzenia onLoad, która zostanie wywołana po wczytaniu pliku
    reader.onload = () => {
      const imageDataUrl = reader.result; // Pobranie danych URL obrazu
  
      // Ustawienie danych URL jako źródło obrazu
      setImageSrc(imageDataUrl);
      setModalOpen2(true);
    };
  
    // Wczytanie zawartości pliku jako dane URL
    reader.readAsDataURL(selectedFile);
  };



  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  return (
    <div>
    <div className="overlay"></div>
    <div className="modalBackground" >
      <div className="modalContainer">
        <div className="titleCloseBtn" style={{height: "1vh"}}>
          <button style={{height: "1vh"}}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <AiOutlineCloseCircle size={50} style={{fill: "white"}}/>
          </button>
        </div>
        <div className="title" style={{color: "white", fontSize: "2em"}}>
          <h1 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-white text-center">Choose option to load photo</h1>
          <br />
        </div>
        <div className="bodyModal">
          <div className="iconBtnWrapper">
            <div className="iconWrapper">
              <RiGalleryFill size={100} style={{ color: "white" }} />
            </div>
            <div >
            <input
            ref={inputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
            <button className="btnWrapper1 font-poppins font-semibold"  onClick={ 
              handleButtonClick
              }>
              Load from gallery</button>
              {modalOpen2 && <RealiseContract 
                setOpenModal={setModalOpen2}
                setFile={null}
                readyFile={imageSrc}
                hash={hash}
                />}
            </div>
          </div>
          <div className="iconBtnWrapper">
            <div className="iconWrapper">
              <TbPhotoSensor2 size={100} style={{ color: "white" }} />
            </div>
            <div >
            <button className="btnWrapper2 font-poppins font-semibold" onClick={() => {
              setModalOpen(true);
              }}>Make photo</button>
              {modalOpen && <MakePhoto setOpenModal={setModalOpen} />}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoadPhoto;