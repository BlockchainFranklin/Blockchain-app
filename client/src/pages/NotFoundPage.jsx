import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
import { error404 } from "../constants";

const NotFoundPage = () => {
  useEffect(() => {
    Aos.init({ offset: 200, duration: 900, delay: 500 });
  }, []);

  return (
    <section
      id="login"

      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="center" // Dodaj klasę CSS 'center'
        data-aos="fade"
        style={{ zIndex: 9999 }}
      >
        <h4 className="text-404">
          <span className="digit digit-4">4</span>
          <span className="digit digit-0">0</span>
          <span className="digit">4</span>
        </h4>
        <pre>
          <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-gradient-main text-center">
            {error404.find(btn => btn.id === '404').content}
          </h4>
        </pre>   
        <br />
        <br />
        <br />   
        <div className="mx-10">
          <Link to="/">
            <button className="bg-yellow-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded xl:py-8 xl:px-16">
            <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-center">
              {error404.find(btn => btn.id === '404').button}
              </h4>
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[0%] rounded-full blue__gradient_animation bottom-0" />{" "}
      <div className="absolute z-[0] w-[80%] h-[80%] -top-[50%] -left-[30%] rounded-full dark__gradient_animation bottom-0" />{" "}
    </section>
  );
};

export default NotFoundPage;
