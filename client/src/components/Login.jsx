import { Canvas } from "@react-three/fiber";
import Sphere from "../components/Sphere";
import React from 'react';
import { metaMask } from '../hooks';
import { buttonList, loginText } from "../constants"

const Login = () => {
  const { connect } = metaMask()
  
  return (
    <section id="login">
      <div className="center flex flex-row justify-between items-center w-full">
        <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
          {loginText.find(btn => btn.id === 'start').content}   
          <br className="sm:block hidden" /> {" "} 
        </h1>   
      </div>

      <div className="center flex flex-row justify-between items-center w-full">
        <h3 className="flex-1 font-poppins font-semibold ss:text-[42px] text-[32px] text-white ss:leading-[100px] leading-[75px]">
          What is crypto wallet?  
          <br className="sm:block hidden" /> {" "} 
        </h3>  
      </div>

      <div className="center flex flex-row justify-center items-center w-full">
        <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
          <button className="font-poppins font-semibold text-black text-lg bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded-md">
            Learn More
          </button>
        </a>
      </div>


      <div style={{ position: 'relative' }}>
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          backgroundColor: 'rgba(0, 0, 0, 0.3)', 
          borderRadius: '20px', 
          padding: '3vh',
          zIndex: 2 
          }}>
          <h1 className='font-poppins font-semibold xs:text-[34.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-white text-center'>
              Choose <span className="text-yellow-400">Wallet</span> <br /> <br /> to continue
          </h1>
          <br />
          <div className='mt-8' style={{ display: 'flex', flexDirection: 'column' }}>
            {buttonList.map((buttonList) => (
            <div
              key={buttonList.name}
              className='flex items-center justify-between mb-5 px-4'
            >
              <button
                onClick={connect}
                type='button'
                className='my-6 lg:my-0 bg-black text-white text-center center text-primary-200 font-semibold py-2 px-6 items-center rounded-lg flex justify-center '
                style={{ marginRight: '10px' }}
              >
              <img src={buttonList.icon} alt={buttonList.id} className='w-[30px]' />
               &nbsp; &nbsp; {buttonList.name}
              </button>
            </div>
          ))}
          </div>
        </div>
        <Canvas camera={{ position: [0.0, 0.0, 7.0] }} style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <Sphere />
        </Canvas>
      </div>
    </section> 
  )
}
export default Login;
