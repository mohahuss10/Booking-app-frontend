import React from 'react'
import { Link } from 'react-router-dom'



function Hero() {
  return (
    <div className=' md:h-[100vh] h-[50vh] w-auto flex sm:bg-cover bg-opacity-5 ' 
    style={{
        backgroundImage: `url('/images/bg1.jpg')`,
      }}
    >

<div className='absolute md:h-[100vh] h-[50vh]  md:mt-0 inset-0 bg-opacity-60 bg-black'></div>

        <header className='sm:mt-44 mt-24 md:ml-20 ml-5 z-0'>
            
            <h1 className=' md:text-6xl text-2xl text-white font-bold mt-4 tracking-tight'>Effortless Booking, Anytime.</h1>
            <h1 className=' md:text-6xl text-2xl text-white font-bold tracking-wider sm:mt-3 mt-5'>Your Schedule, Your Way!</h1>
            <p className='text-white/80 font-semibold text-lg sm:mt-5 mt-14 sm:w-full w-60'>"Making Scheduling Simple, One Click at a Time"</p>

            

            
            {/* <button className='bg-indigo-600 px-10 py-3 sm:mt-7 mt-14 rounded-full'>
                <span className='text-white font-semibold text-sm'>Make a booking below</span>
            </button> */}
           

           
        </header>
        
    </div>
  )
}

export default Hero