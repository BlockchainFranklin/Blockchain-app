import React, { useEffect, useState } from "react";
import { getQuote } from '../hooks';
import { MdOutlineAddAPhoto } from "react-icons/md";
import { SiPhotobucket } from "react-icons/si";
import { BiUpload, BiQrScan } from "react-icons/bi";
import { SiHiveBlockchain } from "react-icons/si";
import { RiUserSharedLine } from "react-icons/ri";
import { LoadPhoto }  from '../modals';
import Aos from "aos";
import "aos/dist/aos.css";

const TakePhoto = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])

  const { quote, author } = getQuote();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="features" className="sm:py-0 py-0 px-10 flex justify-center items-center flex-col relative" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
      <div data-aos="zoom-in" className="absolute z-[0] w-[40%] h-[40%]  rounded-full lightblue3__gradient top-0" /> 
        <div className="flex items-center justify-center">
        <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-yellow text-center" style={{ float: 'left', marginRight: '10px' }}>
          Make progress!
        </h4>
        <div style={{ clear: 'both' }}></div>
      </div>
      <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-violet text-center" style={{ float: 'left', marginRight: '10px' }}>
      Load photo
    </h4>

        <br />
        <div className="relative light">
        <SiPhotobucket size={200} style={{ fill: "white" }} />
        <div
          className="absolute z-10 w-full h-full rounded-full yellow__gradient"
          style={{ top: '-0px', left: '-0px' }}
          />
        </div>
        <br />
        <br />
        <div style={{color: "white", fontFamily: 'Bruno Ace SC', fontSize: '1.1em', fontWeight: 'bold', textAlign: 'center' }}>
          <h2>{quote}</h2>
          <br/>
          <p style={{fontStyle: 'italic', fontSize: '0.8em'}}>{author}</p>
        </div>

        <div className=" py-10">
          <button onClick={() => {
            setModalOpen(true);
          }} className="bg-yellow-400 hover:bg-yellow-500 font-poppins font-semibold text-black font-bold px-20 rounded" style={{ height: '75px', fontSize: '2.0em' }}>
            Let load photo!
          </button>
          {modalOpen && <LoadPhoto setOpenModal={setModalOpen} style={{zIndex: 100}} />}
          </div>



      

      <div className="w-full  container row">

          <div data-aos="fade-center" data-aos-delay="50" className="containerTakePhoto">
            <div className="columnTakePhoto" style={{marginLeft: "10vh", justifyContent: "center", alignItems: "center", color: "white", fontFamily: 'Bruno Ace SC', fontSize: '10.0em', fontWeight: 'bold', textAlign: 'center' }}>
              1
            </div>
            <div className="columnTakePhoto" style={{marginLeft: "2vh", justifyContent: "center", alignItems: "center", color: "white", textAlign: "center"}}>
              <MdOutlineAddAPhoto size={50} style={{fill: "white"}}/>
              <h2>Make or prepare photo</h2>
            </div>
          </div>

          <div data-aos="fade-center" data-aos-delay="100" className="containerTakePhoto">
            <div className="columnTakePhoto" style={{marginLeft: "10vh", justifyContent: "center", alignItems: "center", color: "white", fontFamily: 'Bruno Ace SC', fontSize: '10.0em', fontWeight: 'bold', textAlign: 'center' }}>
              2
            </div>
            <div className="columnTakePhoto" style={{marginLeft: "2vh", justifyContent: "center", alignItems: "center", color: "white", textAlign: "center"}}>
              <BiUpload size={50} style={{fill: "white"}}/>
              <h1 style={{justifyContent: "center", alignItems: "center", color: "white"}}>
              Upload photo by website</h1>
            </div>
          </div>

          <div data-aos="fade-center" data-aos-delay="150" className="containerTakePhoto">
            <div className="columnTakePhoto" style={{marginLeft: "10vh", justifyContent: "center", alignItems: "center", color: "white", fontFamily: 'Bruno Ace SC', fontSize: '10.0em', fontWeight: 'bold', textAlign: 'center' }}>
              3
            </div>
            <div className="columnTakePhoto" style={{marginLeft: "2vh", justifyContent: "center", alignItems: "center", color: "white", textAlign: "center"}}>
              <BiQrScan size={50} style={{fill: "white"}}/>
              <h2>Generate QR code with link to share</h2>
            </div>
          </div>

          <div data-aos="fade-center" data-aos-delay="200" className="containerTakePhoto">
            <div className="columnTakePhoto" style={{marginLeft: "10vh", justifyContent: "center", alignItems: "center", color: "white", fontFamily: 'Bruno Ace SC', fontSize: '10.0em', fontWeight: 'bold', textAlign: 'center' }}>
              4
            </div>
            <div className="columnTakePhoto" style={{marginLeft: "2vh", justifyContent: "center", alignItems: "center", color: "white", textAlign: "center"}}>
              <RiUserSharedLine  size={50} style={{fill: "white"}}/>
              <h2>Share photo on social media</h2>
            </div>
          </div>

      </div>
    </section>
  );
};

export default TakePhoto