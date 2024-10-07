import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Link as ScrollLink } from 'react-scroll'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(true);

  const handleScrollLink = (target) => {
    if (location.pathname !== '/') {
      // Ako nismo na glavnoj stranici, navigiraj na početnu stranicu
      navigate('/');
      // Kada se navigacija izvrši, postavi mali timeout za skrolovanje
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // 100ms je dovoljno vreme da se komponenta učita
    } else {
      // Ako smo već na početnoj, skroluj direktno
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className='absolute z-50 w-full'>
      <div className='lg:flex fixed bg-neutral-950 text-neutral-200 w-full justify-center px-4' >
        <div className='absolute top-2 left-2 rounded-sm'>
          <Link to={'/'}> <img className='w-1/3' src={assets.logo} alt="logo"/></Link>
        </div>
        
        <div className='hidden sm:flex gap-4 p-5 text-sm'>
          
          <NavLink to='/' className='transition-all relative flex flex-col items-center gap-1 group'>
            <p className=' text-zinc-200 hover:text-zinc-400'>POČETNA</p>
            <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
          </NavLink>
          <NavLink to='/termin' className='transition-all relative flex flex-col items-center gap-1 group'>
            <p className='text-[#bc9355]'>ZAKAZI TERMIN</p>
            <div className='w-0 h-0.5 bg-[#886930] transition-all duration-300 group-hover:w-2/4 '></div>
          </NavLink>
          
          {/* Implementacija skrolovanja sa preusmeravanjem */}
          <div onClick={() => handleScrollLink('usluge')} className='transition-all relative flex flex-col items-center gap-1 group cursor-pointer'>
            <p className='text-zinc-200 hover:text-zinc-400'>USLUGE</p>
            <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
          </div>
          
          <div onClick={() => handleScrollLink('cenovnik')} className='transition-all relative flex flex-col items-center gap-1 group cursor-pointer'>
            <p className='text-zinc-200 hover:text-zinc-400'>CENOVNIK</p>
            <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
          </div>
          
          <div onClick={() => handleScrollLink('rad')} className='transition-all relative flex flex-col items-center gap-1 group cursor-pointer'>
            <p className='text-zinc-200 hover:text-zinc-400'>GALERIJA</p>
            <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
          </div>
          
          <div onClick={() => handleScrollLink('radnovr')} className='transition-all relative flex flex-col items-center gap-1 group cursor-pointer'>
            <p className='text-zinc-200 hover:text-zinc-400'>RADNO VREME</p>
            <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
          </div>
          
          <NavLink to='/contact' className='transition-all relative flex flex-col items-center gap-1 group'>
            <p className='text-zinc-200 hover:text-zinc-400'>KONTAKT</p>
            <div className='w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-2/4 '></div>
          </NavLink>
        </div>
        <div className='lg:hidden flex justify-end'>
          <img src={assets.menu} alt="" className='w-8 m-4' onClick={()=> setMobileMenu(!mobileMenu)}/>
          {mobileMenu && (
            <div>
              {console.log('radi')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
