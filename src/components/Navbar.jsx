import React, { useState } from "react";
import logo from "../images/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-scroll';

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)

  return (
    <div className="w-full h-[70px] flex justify-between items-center px-4 bg-[#f0e9ae] text-gray-800">
      <div>
        <img src={logo} alt="Logo" style={{ width: "100px" }} />
      </div>

      {/* menu */}
      <ul className='hidden md:flex'>
        <li>
          <Link to='home' smooth={true} duration={300}>
            Home
          </Link>
        </li>
        <li>
          <Link to='stats' smooth={true} duration={300}>
            Stats
          </Link>
        </li>
        <li>
          <Link to='schedule' smooth={true} duration={300}>
            Schedule
          </Link>
        </li>
        <li>
          <Link to='gallery' smooth={true} duration={300}>
            Gallery
          </Link>
        </li>
      </ul>

      {/* {Hamburger menu - hidden for size greater than medium} */}
      <div onClick={handleClick} className='md:hidden z-10' style={{marginLeft: 'auto'}}>
        {!nav ? <FaBars/> : <FaTimes/>} 
      </div>

      {/* mobile (small mode) menu */}
      <div>
        <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#243E36] flex flex-col justify-center items-center text-white'}>
          <li className="py-4 text-4xl"> 
            <Link to='home' smooth={true} duration={100} onClick={handleClick}>
              Home
            </Link> 
          </li>
          <li className="py-6 text-4xl"> 
            <Link to='stats' offset={100} smooth={true} duration={100} onClick={handleClick}>
              Stats
            </Link> 
          </li>
          <li className="py-6 text-4xl"> 
            <Link to='schedule' smooth={true} duration={100} onClick={handleClick}>
              Schedule
            </Link> 
          </li>
          <li className="py-6 text-4xl"> 
            <Link to='gallery' smooth={true} duration={100} onClick={handleClick}>
              Gallery
            </Link> 
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Navbar;
