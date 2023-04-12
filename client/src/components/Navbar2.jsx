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

    <div class="mx-10">
    <button class="bg-yellow-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded">
      <Link to="/">Return to home </Link>
  
    </button>
    </div>

    <div class="mx-10">
    <button class="bg-yellow-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded">
      <Link to="/blob">BLOOBOBO </Link>
  
    </button>
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