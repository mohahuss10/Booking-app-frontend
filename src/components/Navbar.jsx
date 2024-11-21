import React, {useState} from 'react'


import { HiMenu, HiX } from "react-icons/hi";
import { Link } from 'react-router-dom';

function Navbar() {


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

   

    const closeMobileMenu = () => {
      setIsMenuOpen(false);
    };

  return (
    <div className=' bg-transparent absolute z-10'>
<header className="pt-2 z-10">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex-1 md:flex md:items-center md:gap-12 flex">
        <Link to={"/"}>
        <div className="  flex w-20">
          <h1 className=' font-bold text-2xl text-indigo-400 pl-1'>Booking.io</h1>
        </div>
        </Link>
      </div>

      <div className="md:flex md:items-center md:gap-12 lg:ml-[650px]">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-10 text-base font-semibold">

            <Link to={'/'}>
            <li className="text-white transition hover:text-white/75">
              
                Home
              
            </li>
            </Link>

            <Link to={'/services'}>

            <li className='text-white transition  hover:text-white/75'>
              
                Services
            
            </li>
            </Link>

            

            
          </ul>
        </nav>

        <div className="flex items-center gap-4 overflow-x-hidden">
          <div className="sm:flex sm:gap-4 ml-[155px] md:ml-0">
            <Link to={'/login'}>
          <button
              className=" border border-white  px-7 py-2 text-sm font-medium text-white shadow rounded-3xl"
              
            >
              Login
            </button>
            </Link>

            <Link to={'/register'}>
            <button
              className=" bg-indigo-500  px-7 py-2 text-sm font-medium text-white shadow rounded-3xl hidden sm:block"
              
            >
              Get Started
            </button>
            </Link>
            
            
            
          </div>

         
          

        </div>
      </div>
    </div>
  </div>
</header>


    </div>
  )
}

export default Navbar