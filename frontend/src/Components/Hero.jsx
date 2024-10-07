import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className={`relative w-full `}>
      <div className='bg-neutral-900'>
        <img src={assets.hero} className='w-full mix-blend-overlay h-[100vh] lg:h-[100vh]' alt="" />
        
        <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <p className='text-base lg:text-4xl dancing-script-400 text-[#bc9355] pb-4'>BARBERSHOP TOLMAČ</p>
          <Link to={'/termin'}><p className='underline underline-offset-4 lg:no-underline text-xl lg:text-4xl text-neutral-200 lg:p-4 rounded-md text-center hover:bg-[#bc9355] hover:text-neutral-950 hover:scale-105 transition-all ease-in-out '>ZAKAŽI TERMIN</p></Link>

        </div>
        <div className=' text-neutral-200 absolute top-1/2 left-1/2 lg:top-3/4 lg:z-10 lg:left-1/4 lg:bottom-12 -translate-x-1/2 -translate-y-1/2'>
          <div className='text-center'>
            <hr className='m-4 border-neutral-500'/>
            <p className='text-base pb-2 text-neutral-200 font-light'>ADRESA / LOKACIJA</p>
            <p className='text-2xl font-medium text-[#bc9355]'>Njegoševa 52,</p>
            <p className='text-2xl font-medium text-[#bc9355]'>Novi Bečej</p>
          </div>
        </div>
        
        {/* Drugi blok */}
        <div className=' text-neutral-200 absolute z-10 left-1/2 bottom-12 lg:top-3/4 -translate-x-1/2 -translate-y-1/2'>
          <div className='text-center'>
          <hr className='m-4 border-neutral-500'/>
            <p className='text-base pb-2 font-light text-neutral-200'>KONTAKT</p>
            <p className='text-2xl font-medium text-[#bc9355]'>+381 060 123 45 678</p>
            <p className='text-2xl font-medium text-[#bc9355]'>tolmac@gmail.com</p>
          </div>
        </div>
        
        {/* Treći blok */}
        <div className='hidden lg:flex lg:text-neutral-200 lg:absolute lg:z-10 lg:left-3/4 lg:bottom-12 lg:top-3/4  lg:-translate-x-1/2 lg:-translate-y-1/2'>
          <div className='text-center'>
          <hr className='m-4 border-neutral-500'/>
            <p className='text-base pb-2 font-light text-neutral-200'>RADNO VREME</p>
            <p className='text-2xl font-medium text-[#bc9355]'>UTORAK-SUBOTA: 08:00 - 18:00 </p>
            <p className='text-2xl font-medium text-[#bc9355]'>PONEDELJAK I NEDELJA: NE RADIM </p>
          </div>         
        </div>
      </div>
    </div>
  )
}

export default Hero
