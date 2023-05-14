import React, { useEffect, useState } from "react";
import { getQuote } from '../hooks';
import { MdOutlineAddAPhoto } from "react-icons/md";
import { SiPhotobucket } from "react-icons/si";
import { BiUpload, BiQrScan } from "react-icons/bi";
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
      {/* <div data-aos="zoom-in" className="absolute z-[0] w-[60%] h-[100%]  rounded-full lightblue__gradient bottom-40" /> */}
        <h2 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-main text-center">
          Make progress! <br />
          Load photo
          <br className="sm:block hidden" />
        </h2>
        <br />
        <div className="relative light">
        <SiPhotobucket size={200} style={{ fill: "white" }} />
        <div
          className="absolute z-10 w-full h-full rounded-full yellow__gradient"
          style={{ top: '-0px', left: '-0px' }}
          />
        </div>
        <div className="mx-10 py-10">
          <button onClick={() => {
            setModalOpen(true);
          }} className="bg-yellow-400 hover:bg-yellow-400 text-white font-bold px-20 rounded" style={{ zIndex: 100, height: '75px', fontSize: '2.0em' }}>
            Let load photo!
          </button>
          {modalOpen && <LoadPhoto setOpenModal={setModalOpen} />}
          </div>

        <div style={{color: "white", fontFamily: 'Bruno Ace SC', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }}>
          <h2>{quote}</h2>
          <br/>
          <p style={{fontStyle: 'italic', fontSize: '0.8em'}}>{author}</p>
        </div>

      

      <div className="w-full pt-16 pb-16 container row">

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
              <h2 style={{justifyContent: "center", alignItems: "center", color: "white"}}>
              Upload photo by website</h2>
            </div>
          </div>

          <div data-aos="fade-center" data-aos-delay="150" className="containerTakePhoto">
            <div className="columnTakePhoto" style={{marginLeft: "10vh", justifyContent: "center", alignItems: "center", color: "white", fontFamily: 'Bruno Ace SC', fontSize: '10.0em', fontWeight: 'bold', textAlign: 'center' }}>
              3
            </div>
            <div className="columnTakePhoto" style={{marginLeft: "2vh", justifyContent: "center", alignItems: "center", color: "white", textAlign: "center"}}>
              <BiQrScan size={50} style={{fill: "white"}}/>
              <h2>Generate QR code and link to share</h2>
            </div>
          </div>

          <div data-aos="fade-center" data-aos-delay="200" className="containerTakePhoto">
            <div className="columnTakePhoto" style={{marginLeft: "10vh", justifyContent: "center", alignItems: "center", color: "white", fontFamily: 'Bruno Ace SC', fontSize: '10.0em', fontWeight: 'bold', textAlign: 'center' }}>
              4
            </div>
            <div className="columnTakePhoto" style={{marginLeft: "2vh", justifyContent: "center", alignItems: "center", color: "white", textAlign: "center"}}>
              <MdOutlineAddAPhoto size={50} style={{fill: "white"}}/>
              <h2>Blockchain system</h2>
            </div>
          </div>

      </div>
    </section>
  );
};

export default TakePhoto