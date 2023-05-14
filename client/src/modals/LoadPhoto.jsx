import React, { useState } from "react";
import { RiGalleryFill } from "react-icons/ri";
import { TbPhotoSensor2 } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MakePhoto }  from '../modals';

function LoadPhoto({ setOpenModal }) {
  const [showImagePicker, setShowImagePicker] = useState(false);
  const handleLoadFromGalleryClick = () => {
    setShowImagePicker(true);
  };

  const inputRef = React.useRef(null);
  const handleButtonClick = () => {
    inputRef.current.click();
  };
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    // do something with the selected file
  };
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
    <div className="overlay"></div>
    <div className="modalBackground" >
      <div className="modalContainer">
        <div className="titleCloseBtn" style={{height: "50px"}}>
          <button style={{height: "50px"}}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <AiOutlineCloseCircle size={50} style={{fill: "white"}}/>
          </button>
        </div>
        <div className="title" style={{color: "white", fontSize: "2em"}}>
          <h1>Choose option to load photo</h1>
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
            <button className="btnWrapper1" onClick={handleButtonClick}>
            Load from gallery</button>
            </div>
          </div>
          <div className="iconBtnWrapper">
            <div className="iconWrapper">
              <TbPhotoSensor2 size={100} style={{ color: "white" }} />
            </div>
            <div >
            <button className="btnWrapper2" onClick={() => {
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