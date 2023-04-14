import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { close, logo, menu } from '../assets';
import { navLinks } from '../constants';
import { useReadingProgress } from '../hooks'


const Navbar = () => {


  const [toggle, setToggle] = useState(false)
  const completion = useReadingProgress();

  return (
    <nav className=" w-full flex py-6 justify-between items-center top-0 " >
    
    <img src={logo} alt="chainfit" className="w-[100px] h-[65px]" />

    <ul className="list-none sm:flex hidden justify-end items-center flex-1">
      {navLinks.map((nav, index) => (
        <li
          key={nav.id}
          className={`font-poppins font-normal cursor-pointer text-[16px] ${
            index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}
           text-white`}
        >
          <a href={`#${nav.id}`}>
            {nav.title}
          </a>
        </li>
      ))}
      <div className="mx-10">
      <button className="bg-yellow-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded">
        <Link to="/login">Connect to Wallet </Link>
    
      </button>
      </div>
    </ul>
    
    <div className="sm:hidden flex flex-1 justify-end items-center">
      <img 
        src={toggle ? close : menu} 
        alt="menu"
        className="w-[28px] h-[28px] object-contain"
        onClick={() => setToggle((prev) => !prev)}
      />
      
      <div
        className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
        <ul className="list-none flex flex-col justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                index === navLinks.length - 1 ? 'mr-0' : 'mb-4'}
              text-white`}
            >
              <a href={`#${nav.id}`}>
                {nav.title}
              </a>

            </li>
            
          ))}
          <div className="mx-10">
          <button className="bg-yellow-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded">
            <Link to="/login">Connect to Wallet </Link>
        
          </button>
          </div>
        </ul>
      </div>
      
    </div>


    
  <span style = {{ 
    position: "absolute", 
    bottom: "0", 
    left: "0", 
    height: "2px", 
    backgroundColor: "yellow", 
    width: "100%",
    transform: `translateX(${completion-100}%)`}}  
  />
  </nav>
  )
}

export default Navbar