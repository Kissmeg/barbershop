import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-neutral-900 text-neutral-200 px-20 pt-10'>
      <div className='lg:flex justify-evenly'>
        <div className='lg:w-[20%]'>
                <div className='flex justify-center'>
                    <img src={assets.logo} alt="" className='w-1/3 rounded-lg'/>
                </div>
                <div className='flex justify-center gap-2'>
                  <Link to={'https://www.instagram.com/barbershop.t0lmac/'}><FaInstagram className='text-2xl text-[#bc9355] w-8'></FaInstagram></Link>
                  <Link to={'https://www.instagram.com/barbershop.t0lmac/'}><FaFacebook  className='text-2xl text-[#bc9355] w-8'></FaFacebook></Link>
                  <Link to={'https://www.tiktok.com/@t0lmac?lang=en'}><FaTiktok    className='text-2xl text-[#bc9355] w-8'></FaTiktok></Link>
                </div>
          </div>
        
        <div className='m-4 lg:w-[20%]'>
            <p className='text-2xl p-1'>Stranice</p>
            <Link to={'/'}><p className='p-1 text-neutral-400         hover:text-[#bc9355] hover:underline underline-offset-4 hover:translate-x-2  transition-all duration-200'>Početna</p></Link>
            <Link to={'/termin'}><p className='p-1 text-neutral-400   hover:text-[#bc9355] hover:underline underline-offset-4 hover:translate-x-2  transition-all duration-200'>Zakaži termin</p></Link>
            <Link to={'/contact'}><p className='p-1 text-neutral-400  hover:text-[#bc9355] hover:underline underline-offset-4 hover:translate-x-2  transition-all duration-200'>Kontakt</p></Link>
        </div>
        <div className='m-4 lg:w-[20%]'>
            <Link to={'/termin'}><p className='text-2xl p-1 text-[#bc9355] hover:translate-x-2 transition-all duration-200'>Zakaži termin</p></Link>
            <ScrollLink to='usluge' smooth={true} duration={500} offset={-50} className='cursor-pointer' ><p className='p-1   text-neutral-400 hover:underline underline-offset-4 hover:text-[#bc9355] hover:translate-x-2 transition-all duration-200'>Usluge</p></ScrollLink>
            <ScrollLink to='cenovnik' smooth={true} duration={500} offset={-50} className='cursor-pointer' ><p className='p-1 text-neutral-400 hover:underline underline-offset-4 hover:text-[#bc9355] hover:translate-x-2 transition-all duration-200' >Cenovnik</p></ScrollLink>
            <ScrollLink to='rad' smooth={true} duration={500} offset={-50} className='cursor-pointer' ><p className='p-1      text-neutral-400 hover:underline underline-offset-4 hover:text-[#bc9355] hover:translate-x-2 transition-all duration-200' >Moj rad</p></ScrollLink>
  
        
        </div>
        <div className='m-4 lg:w-[20%]'>
            <p className='text-2xl p-1'>Kontakt</p>
            <p className='p-1 text-neutral-400 '>+381 061 200 61 09</p>
            <p className='p-1 text-neutral-400 '>tolmac@gmail.com</p>
            <iframe className='w-full lg:w-[250px] lg:h-[250px] p-4 rounded-xl' title='Google Location' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d842.454267920781!2d20.1451069!3d45.5941117!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b2d97ff910d7f%3A0x1e0086208185dd58!2zTmplZ2_FoWV2YSAyNtCQLCBOb3ZpIEJlxI1lag!5e1!3m2!1sen!2srs!4v1727991159229!5m2!1sen!2srs"></iframe>      

        </div>
      </div>
      <div>
        <hr />
        <div className='lg:flex text-center justify-center p-4'>
          <p className=''>Barbershop Tolmač - All Rights Reserved, 2024.</p>
          
        </div>
        <p className='text-center'>Designed and Developed by </p>
        <Link to={"https://www.linkedin.com/in/david-kish03/"}><p className='text-center p-4 text-[#bc9355] hover:underline underline-offset-2 transition-all ease-in-out'>David</p></Link>

      </div>
    </div>
  )
}

export default Footer
