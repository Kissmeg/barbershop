import React from 'react'
import { assets } from '../assets/assets'
import { Link as ScrollLink } from 'react-scroll'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='absolute z-50 w-full'>
      <div className='flex fixed bg-neutral-950 text-neutral-200 w-full justify-center px-4' >
        <div className='absolute top-2 left-2 rounded-sm'>
          <Link to={'/'}> <img className='w-1/3' src={assets.logo} alt="logo"/></Link>
        </div>
        <div className='flex sm:flex gap-4 p-5 text-sm'>
          
            <NavLink to='/' className='transition-all relative flex flex-col items-center gap-1 group'>
              <p className=' text-zinc-200 hover:text-zinc-400'>POČETNA</p>
              <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
            </NavLink>
            <NavLink to='/termin' className='transition-all relative flex flex-col items-center gap-1 group'>
              <p className='text-[#bc9355]'>ZAKAZI TERMIN</p>
              <div className='w-0 h-0.5 bg-[#886930] transition-all duration-300 group-hover:w-2/4 '></div>
            </NavLink>
            <ScrollLink to='usluge' smooth={true} duration={500} offset={-50} className='transition-all relative flex flex-col items-center gap-1 group cursor-pointer'>
              <p className='text-zinc-200 hover:text-zinc-400'>USLUGE</p>
              <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
            </ScrollLink>
            <ScrollLink to='cenovnik' smooth={true} duration={500} offset={-50} className='transition-all relative flex flex-col items-center gap-1 group cursor-pointer'>
              <p className='text-zinc-200 hover:text-zinc-400'>CENOVNIK</p>
              <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
            </ScrollLink>
            <ScrollLink to='rad' smooth={true} duration={500} offset={-50} className='transition-all relative flex flex-col items-center gap-1 group cursor-pointer'>
              <p className='text-zinc-200 hover:text-zinc-400'>GALERIJA</p>
              <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
            </ScrollLink>
            <ScrollLink to='radnovr' smooth={true} duration={500} offset={-50} className='transition-all relative flex flex-col items-center gap-1 group cursor-pointer'>
              <p className='text-zinc-200 hover:text-zinc-400'>RADNO VREME</p>
              <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
            </ScrollLink>
            <NavLink to='/contact' className='transition-all relative flex flex-col items-center gap-1 group'>
              <p className='text-zinc-200 hover:text-zinc-400'>KONTAKT</p>
              <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
            </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
