import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='relative w-full'>
      <div className='bg-neutral-900'>
        <img src={assets.hero} className='w-full mix-blend-overlay h-[100vh]' alt="" />
        
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <p className='text-5xl text-neutral-200 pb-4'>BARBERSHOP TOLMAČ</p>
          <p className='text-2xl text-neutral-200 border-2 p-2 rounded-md text-center hover:bg-yellow-600 '>ZAKAZI TERMIN</p>
        </div>
        <div className='text-neutral-200 absolute z-10 left-1/4 bottom-12 -translate-x-1/2 -translate-y-1/2'>
          <div className='text-center'>
            <hr className='m-4 border-neutral-500'/>
            <p className='text-xl pb-2 text-neutral-400'>ADRESA / LOKACIJA</p>
            <p className='text-2xl'>Njegoševa 52,</p>
            <p className='text-2xl'>Novi Bečej</p>
          </div>
        </div>
        
        {/* Drugi blok */}
        <div className='text-neutral-200 absolute z-10 left-1/2 bottom-12 -translate-x-1/2 -translate-y-1/2'>
          <div className='text-center'>
          <hr className='m-4 border-neutral-500'/>
            <p className='text-xl pb-2 text-neutral-400'>KONTAKT</p>
            <p className='text-2xl '>+381 060 123 45 678</p>
            <p className='text-2xl invisible'>prazan</p>
          </div>
        </div>
        
        {/* Treći blok */}
        <div className='text-neutral-200 absolute z-10 left-3/4 bottom-12 -translate-x-1/2 -translate-y-1/2'>
          <div className='text-center'>
          <hr className='m-4 border-neutral-500'/>
            <p className='text-xl pb-2 text-neutral-400'>RADNO VREME</p>
            <p className='text-2xl '>UTORAK-SUBOTA: 08:00 - 18:00 </p>
            <p className='text-2xl '>PONEDELJAK I NEDELJA: NE RADIM </p>
          </div>         
        </div>
      </div>
    </div>
  )
}

export default Hero
