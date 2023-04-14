import { Canvas } from "@react-three/fiber";
import Sphere from "../components/Sphere";
import React, { useState, useContext  } from 'react';
import PhantomLogo from '../assets/phantom.png';
import { Icon } from '@iconify/react';
import { injected } from '../components';
import { metaMask } from '../components';

const Login = () => {

  const { connect, disconnect, isActive, account } = metaMask()
  
  const buttonList = [
    {
      name: 'Phantom',
      icon: <img src={PhantomLogo} alt='phantom logo' className='w-[30px]' />,
      connector: injected,

    },
    {
      name: 'MetaMask',
      icon: <Icon icon='logos:metamask-icon' className='text-2xl' />,
      connector: injected,

    },
  ];

  return (
    <section id="login" >
      <div className={` center`}>     
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px]
          text-white ss:leading-[100px] leading-[75px]">
            Start your practise today <br className="sm:block hidden" /> {" "} 
          </h1>   
        </div>
      </div>

      <div style={{ position: 'relative', height: '500px' }}>
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
        borderRadius: '20px', 
        padding: '60px',
        zIndex: 2 
      }}>
        <h3 className='text-white text-center center font-semibold mr-4'>
          Choose Wallet to continue
        </h3>
         <br></br>
         <div className='mt-8' style={{ display: 'flex', flexDirection: 'column' }}>
         {buttonList.map((wallet) => (
           <div
             key={wallet.name}
             className='flex items-center justify-between mb-5 px-4'
           >
             <button
               onClick={connect}
               type='button'
               className='my-6 lg:my-0 bg-black text-white text-center center text-primary-200 font-semibold py-2 px-6 items-center rounded-lg flex justify-center '
               style={{ marginRight: '10px' }}
             >
               {wallet.icon}  &nbsp; &nbsp; {wallet.name}
             </button>
           </div>
         ))}
       </div>
   
      </div>
      <Canvas camera={{ position: [0.0, 0.0, 6.0] }} style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Sphere />
      </Canvas>
    </div>
    </section> 
  )
}

export default Login;
